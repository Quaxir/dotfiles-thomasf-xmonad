// Generated by CoffeeScript 1.7.1
(function() {
  var GRID_WIDTH, changeGridWidth, mash, mashShift, spacing;

  mash = ["cmd", "alt", "ctrl"];

  mashShift = ["cmd", "alt", "shift"];

  spacing = {
    x: 5,
    y: 5
  };

  GRID_WIDTH = 2;

  changeGridWidth = function(by_) {
    GRID_WIDTH = Math.max(2, GRID_WIDTH + by_);
    api.alert("grid is now " + GRID_WIDTH + " tiles wide", 1);
    return _.each(Window.visibleWindows(), function(win) {
      return win.snapToGrid();
    });
  };

  Window.prototype.getGrid = function() {
    var halfScreenHeight, rect, screenRect, thirdScreenWidth, winFrame;
    winFrame = this.frame();
    screenRect = this.screen().frameWithoutDockOrMenu();
    thirdScreenWidth = screenRect.width / GRID_WIDTH;
    halfScreenHeight = screenRect.height / 2;
    rect = {
      x: Math.round((winFrame.x - screenRect.x) / thirdScreenWidth),
      y: Math.round((winFrame.y - screenRect.y) / halfScreenHeight),
      w: Math.max(1, Math.round(winFrame.width / thirdScreenWidth)),
      h: Math.max(1, Math.round(winFrame.height / halfScreenHeight))
    };
    return rect;
  };

  Window.prototype.setGrid = function(grid, screen) {
    var halfScreenHeight, rect, screenRect, thirdScreenWidth;
    screenRect = screen.frameWithoutDockOrMenu();
    thirdScreenWidth = screenRect.width / GRID_WIDTH;
    halfScreenHeight = screenRect.height / 2;
    rect = {
      x: (grid.x * thirdScreenWidth) + screenRect.x,
      y: (grid.y * halfScreenHeight) + screenRect.y,
      width: grid.w * thirdScreenWidth,
      height: grid.h * halfScreenHeight
    };
    if (grid.x > 0) {
      rect.x += spacing.x;
      rect.width -= spacing.x;
    }
    if (grid.y > 0) {
      rect.y += spacing.y;
      rect.height -= spacing.y;
    }
    return this.setFrame(rect);
  };

  Window.prototype.snapToGrid = function() {
    if (this.isNormalWindow()) {
      return this.setGrid(this.getGrid(), this.screen());
    }
  };

  api.bind('D', mash, function() {
    return api.launch("Dictionary");
  });

  api.bind(';', mash, function() {
    return Window.focusedWindow().snapToGrid();
  });

  api.bind("'", mash, function() {
    return _.each(Window.visibleWindows(), function(win) {
      return win.snapToGrid();
    });
  });

  api.bind('=', mash, function() {
    return changeGridWidth(+1);
  });

  api.bind('-', mash, function() {
    return changeGridWidth(-1);
  });

  api.bind('H', mashShift, function() {
    return Window.focusedWindow().focusWindowLeft();
  });

  api.bind('L', mashShift, function() {
    return Window.focusedWindow().focusWindowRight();
  });

  api.bind('K', mashShift, function() {
    return Window.focusedWindow().focusWindowUp();
  });

  api.bind('J', mashShift, function() {
    return Window.focusedWindow().focusWindowDown();
  });

  api.bind('M', mash, function() {
    var f, win;
    win = Window.focusedWindow();
    f = {
      x: 0,
      y: 0,
      w: GRID_WIDTH,
      h: 2
    };
    return win.setGrid(f, win.screen());
  });

  api.bind("N", mash, function() {
    var win;
    win = Window.focusedWindow();
    return win.setGrid(win.getGrid(), win.screen().nextScreen());
  });

  api.bind("P", mash, function() {
    var win;
    win = Window.focusedWindow();
    return win.setGrid(win.getGrid(), win.screen().previousScreen());
  });

  api.bind("H", mash, function() {
    var f, win;
    win = Window.focusedWindow();
    f = win.getGrid();
    f.x = Math.max(f.x - 1, 0);
    return win.setGrid(f, win.screen());
  });

  api.bind('L', mash, function() {
    var f, win;
    win = Window.focusedWindow();
    f = win.getGrid();
    f.x = Math.min(f.x + 1, GRID_WIDTH - f.w);
    return win.setGrid(f, win.screen());
  });

  api.bind('O', mash, function() {
    var f, win;
    win = Window.focusedWindow();
    f = win.getGrid();
    f.w = Math.min(f.w + 1, GRID_WIDTH - f.x);
    return win.setGrid(f, win.screen());
  });

  api.bind('I', mash, function() {
    var f, win;
    win = Window.focusedWindow();
    f = win.getGrid();
    f.w = Math.max(f.w - 1, 1);
    return win.setGrid(f, win.screen());
  });

  api.bind('J', mash, function() {
    var f, win;
    win = Window.focusedWindow();
    f = win.getGrid();
    f.y = 1;
    f.h = 1;
    return win.setGrid(f, win.screen());
  });

  api.bind('K', mash, function() {
    var f, win;
    win = Window.focusedWindow();
    f = win.getGrid();
    f.y = 0;
    f.h = 1;
    return win.setGrid(f, win.screen());
  });

  api.bind('U', mash, function() {
    var f, win;
    win = Window.focusedWindow();
    f = win.getGrid();
    f.y = 0;
    f.h = 2;
    return win.setGrid(f, win.screen());
  });

}).call(this);