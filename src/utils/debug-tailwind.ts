// Debug utility to check Tailwind configuration
export const debugTailwind = (): void => {
  // #region agent log
  const checkCustomColor = (): void => {
    const testDiv = document.createElement('div');
    testDiv.className = 'bg-secondary-success';
    testDiv.style.display = 'none';
    document.body.appendChild(testDiv);
    const computed = window.getComputedStyle(testDiv);
    const bgColor = computed.backgroundColor;
    document.body.removeChild(testDiv);
    
    // #region agent log
    const styleSheets = Array.from(document.styleSheets);
    let bgSecondarySuccessRule = null;
    for (const sheet of styleSheets) {
      try {
        const rules = Array.from(sheet.cssRules || []);
        for (const rule of rules) {
          if (rule instanceof CSSStyleRule && rule.selectorText.includes('bg-secondary-success')) {
            bgSecondarySuccessRule = {
              selector: rule.selectorText,
              backgroundColor: rule.style.backgroundColor,
              cssText: rule.cssText.substring(0, 200)
            };
            break;
          }
        }
      } catch (e) {
        // Cross-origin stylesheet
      }
    }
    fetch('http://127.0.0.1:7242/ingest/5b3ac9d4-f4f9-471a-988b-3d625e5a01cf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'debug-tailwind.ts:8',message:'Custom color class test',data:{className:'bg-secondary-success',backgroundColor:bgColor,isApplied:bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent',cssRuleFound:!!bgSecondarySuccessRule,cssRule:bgSecondarySuccessRule,styleSheetsCount:styleSheets.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
  };
  
  const checkTailwindUtilities = (): void => {
    const utilities = ['flex', 'grid', 'hidden', 'block', 'bg-white', 'text-black'];
    const results = utilities.map(util => {
      const testDiv = document.createElement('div');
      testDiv.className = util;
      testDiv.style.display = 'none';
      document.body.appendChild(testDiv);
      const computed = window.getComputedStyle(testDiv);
      const applied = computed.display !== 'inline' || util === 'flex' || util === 'grid' || util === 'block' || util === 'hidden';
      document.body.removeChild(testDiv);
      return { utility: util, applied };
    });
    fetch('http://127.0.0.1:7242/ingest/5b3ac9d4-f4f9-471a-988b-3d625e5a01cf',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'debug-tailwind.ts:22',message:'Tailwind utilities check',data:{results},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  };
  
  setTimeout(() => {
    checkCustomColor();
    checkTailwindUtilities();
  }, 100);
  // #endregion
};
