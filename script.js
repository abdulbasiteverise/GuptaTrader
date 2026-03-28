(() => {
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
  }

  const leadForm = document.getElementById('leadForm');
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(leadForm);
      const name = data.get('name');
      const phone = data.get('phone');
      const issue = data.get('issue');
      const msg = encodeURIComponent(`Hi Guptra Traders, I need RO service in Gaya.%0AName: ${name}%0APhone: ${phone}%0AIssue: ${issue}`);
      window.open(`https://wa.me/919852215570?text=${msg}`, '_blank', 'noopener');
    });
  }
})();
