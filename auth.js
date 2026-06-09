// ── Global PM unlock state ──────────────────────────────────────────────
window.isPMUnlocked = function() { return sessionStorage.getItem('pm_unlocked') === '1'; };
window.setPMUnlocked = function(val) {
  if (val) { sessionStorage.setItem('pm_unlocked', '1'); document.body.classList.add('pm-unlocked'); }
  else     { sessionStorage.removeItem('pm_unlocked'); document.body.classList.remove('pm-unlocked'); }
  document.dispatchEvent(new CustomEvent('pm-lock-change', { detail: { unlocked: !!val } }));
};
if (window.isPMUnlocked()) document.body.classList.add('pm-unlocked');

// ── Wire login widget (runs after DOM ready) ────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  const iconBtn   = document.getElementById('pm-login-icon-btn');
  const pop       = document.getElementById('pm-login-pop');
  const iconUser  = document.getElementById('pm-icon-user');
  const iconCheck = document.getElementById('pm-icon-check');
  if (!iconBtn) return;

  function applyLoginState(unlocked) {
    iconUser.style.display  = unlocked ? 'none'  : 'block';
    iconCheck.style.display = unlocked ? 'block' : 'none';
    iconBtn.classList.toggle('pm-icon-btn--active', unlocked);
    document.getElementById('pm-pop-login').style.display = unlocked ? 'none' : 'flex';
    document.getElementById('pm-pop-out').style.display   = unlocked ? 'flex' : 'none';
    document.getElementById('pm-pop-error').style.display = 'none';
  }

  applyLoginState(window.isPMUnlocked());

  iconBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    pop.style.display = pop.style.display === 'none' ? 'flex' : 'none';
    if (pop.style.display === 'flex' && !window.isPMUnlocked()) {
      setTimeout(() => document.getElementById('pm-pop-user').focus(), 50);
    }
  });

  function tryLogin() {
    const user = document.getElementById('pm-pop-user').value.trim();
    const pw   = document.getElementById('pm-pop-pw').value;
    if (user === 'Product Managers' && pw === 'PM26') {
      window.setPMUnlocked(true);
      applyLoginState(true);
      setTimeout(() => { pop.style.display = 'none'; }, 600);
    } else {
      document.getElementById('pm-pop-error').style.display = 'block';
      document.getElementById('pm-pop-pw').value = '';
      document.getElementById('pm-pop-pw').focus();
    }
  }

  document.getElementById('pm-pop-btn').addEventListener('click', tryLogin);
  document.getElementById('pm-pop-pw').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') tryLogin();
    document.getElementById('pm-pop-error').style.display = 'none';
  });
  document.getElementById('pm-pop-user').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') document.getElementById('pm-pop-pw').focus();
  });
  document.getElementById('pm-pop-logout').addEventListener('click', function() {
    window.setPMUnlocked(false);
    applyLoginState(false);
    document.getElementById('pm-pop-user').value = '';
    document.getElementById('pm-pop-pw').value = '';
  });

  document.addEventListener('click', function(e) {
    if (!pop.contains(e.target) && e.target !== iconBtn) pop.style.display = 'none';
  });
  document.addEventListener('pm-lock-change', function(e) { applyLoginState(e.detail.unlocked); });
});
