import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const widgetCode = `
    class GithubHeatmap extends HTMLElement {
      constructor() {
        super();
        this.render();
      }

      async render() {
        const username = this.getAttribute('username');
        const width = this.getAttribute('width');
        const scale = this.getAttribute('scale') || 1;
        const gap = this.getAttribute('gap') || 5;
        const borderRadius = this.getAttribute('borderRadius') || 3;
        const darkMode = this.getAttribute('darkMode') !== 'false';
        const theme = this.getAttribute('theme') || 'github';
        const reverse = this.getAttribute('reverse') === 'true';
        const showTotalContributions = this.getAttribute('showTotalContributions') === 'true';
        const showProfileData = this.getAttribute('showProfileData') === 'true';
        const showTooltip = this.getAttribute('showTooltip') === 'true';
        const showWeekdays = this.getAttribute('showWeekdays') === 'true';
        const showMonths = this.getAttribute('showMonths') === 'true';
        const shareableSnapshot = this.getAttribute('shareableSnapshot') === 'true';

        
        const params = new URLSearchParams({
          gap: gap.toString(),
          borderRadius: borderRadius.toString(),
          darkMode: darkMode.toString(),
          theme,
          reverse: reverse.toString(),
          showTotalContributions: showTotalContributions.toString(),
          showProfileData: showProfileData.toString(),
          showTooltip: showTooltip.toString(),
          showWeekdays: showWeekdays.toString(),
          showMonths: showMonths.toString(),
          shareableSnapshot: shareableSnapshot.toString()
          });
          
        const iframe = document.createElement('iframe');
        iframe.src = \`http://localhost:3000/embed/\${username}?\${params.toString()}\`;
        iframe.frameBorder = '0';
        iframe.style.width = width + 'px';
        iframe.style.height = ((width / 53) * 8 + 30) + 'px';
        iframe.style.border = 'none';
        iframe.style.borderRadius = '10px';
        iframe.style.transformOrigin = 'top left';
        iframe.style.transform = \`scale(\${scale})\`;

        this.appendChild(iframe);
      }
    }

    customElements.define('github-heatmap', GithubHeatmap);
  `;

  return new NextResponse(widgetCode, {
    headers: {
      'Content-Type': 'application/javascript',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}

export async function OPTIONS(request: Request) {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}