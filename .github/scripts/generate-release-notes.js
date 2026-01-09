#!/usr/bin/env node

/**
 * Generate release notes from git commits
 * Groups commits by type (feat, fix, docs, etc.)
 */

const { execSync } = require('child_process');

function getCommitsSinceLastTag() {
  try {
    const lastTag = execSync('git describe --tags --abbrev=0 2>/dev/null', {
      encoding: 'utf-8',
    }).trim();
    return execSync(`git log ${lastTag}..HEAD --pretty=format:"%s"`, {
      encoding: 'utf-8',
    })
      .trim()
      .split('\n')
      .filter((line) => line.trim().length > 0);
  } catch (error) {
    // No previous tag, get last 20 commits
    return execSync('git log -20 --pretty=format:"%s"', {
      encoding: 'utf-8',
    })
      .trim()
      .split('\n')
      .filter((line) => line.trim().length > 0);
  }
}

function categorizeCommits(commits) {
  const categories = {
    feat: [],
    fix: [],
    docs: [],
    style: [],
    refactor: [],
    test: [],
    chore: [],
    other: [],
  };

  commits.forEach((commit) => {
    const match = commit.match(/^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?:\s*(.+)/i);
    if (match) {
      const type = match[1].toLowerCase();
      const message = match[3];
      if (categories[type]) {
        categories[type].push(message);
      } else {
        categories.other.push(commit);
      }
    } else {
      categories.other.push(commit);
    }
  });

  return categories;
}

function generateReleaseNotes(categories) {
  const sections = [];
  const sectionTitles = {
    feat: '✨ Features',
    fix: '🐛 Bug Fixes',
    docs: '📚 Documentation',
    style: '💅 Style Changes',
    refactor: '♻️ Refactoring',
    test: '🧪 Tests',
    chore: '🔧 Chores',
    other: '📝 Other Changes',
  };

  Object.entries(categories).forEach(([type, commits]) => {
    if (commits.length > 0) {
      sections.push(`## ${sectionTitles[type] || sectionTitles.other}`);
      commits.forEach((commit) => {
        sections.push(`- ${commit}`);
      });
      sections.push('');
    }
  });

  if (sections.length === 0) {
    return '## Release Notes\n\nNo significant changes detected.\n';
  }

  return sections.join('\n');
}

// Main execution
try {
  const commits = getCommitsSinceLastTag();
  const categories = categorizeCommits(commits);
  const releaseNotes = generateReleaseNotes(categories);
  console.log(releaseNotes);
} catch (error) {
  console.error('Error generating release notes:', error.message);
  process.exit(1);
}
