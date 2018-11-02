(function() {

  const storageAvailable = type => {
    try {
      var storage = window[type],
      x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    }
    catch(e) {
      return e instanceof DOMException && (
      e.code === 22 ||
      e.code === 1014 ||
      e.name === 'QuotaExceededError' ||
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      storage.length !== 0;
    }
  };

  const set = (key, obj) => {
    if (storageAvailable('localStorage') && obj !== undefined) {
      localStorage.setItem(key, JSON.stringify(obj));
    } else {
      return false;
    }
  };

  const get = (key) => {
    if (storageAvailable('localStorage')) {
      const storageString = localStorage.getItem(key);
      if (storageString) {
        return JSON.parse(storageString);
      }
    }
    return null;
  };

  window.Storage = {
    set: set,
    get: get
  };

})();
