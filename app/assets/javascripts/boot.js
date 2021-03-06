var WebFontConfig;

WebFontConfig = {
  google: {
    families: ['Anton', 'Pacifico', 'Arvo:700italic', 'Podkova:700']
  },
  active: function() {
    var Configs, ShuffledApp, app;
    Configs = require('Configs');
    ShuffledApp = require('Shuffled');
    app = new ShuffledApp(Configs.desktop.settings.width, Configs.desktop.settings.height);
    app.sketch();
  }
};

(function() {
  var s, wf;
  wf = document.createElement('script');
  wf.src = ('https' === document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  s = document.getElementsByTagName('script')[0];
  return s.parentNode.insertBefore(wf, s);
})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvb3QuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLElBQUEsYUFBQTs7QUFBQSxhQUFBLEdBQ0k7QUFBQSxFQUFBLE1BQUEsRUFDSTtBQUFBLElBQUEsUUFBQSxFQUFVLENBQ04sT0FETSxFQUVOLFVBRk0sRUFHTixnQkFITSxFQUlOLGFBSk0sQ0FBVjtHQURKO0FBQUEsRUFPQSxNQUFBLEVBQVEsU0FBQSxHQUFBO0FBQ0osUUFBQSx5QkFBQTtBQUFBLElBQUEsT0FBQSxHQUFVLE9BQUEsQ0FBUSxTQUFSLENBQVYsQ0FBQTtBQUFBLElBQ0EsV0FBQSxHQUFjLE9BQUEsQ0FBUSxVQUFSLENBRGQsQ0FBQTtBQUFBLElBRUEsR0FBQSxHQUFVLElBQUEsV0FBQSxDQUFZLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQXJDLEVBQ04sT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFEbkIsQ0FGVixDQUFBO0FBQUEsSUFJQSxHQUFHLENBQUMsTUFBSixDQUFBLENBSkEsQ0FESTtFQUFBLENBUFI7Q0FESixDQUFBOztBQUFBLENBZ0JHLFNBQUEsR0FBQTtBQUNDLE1BQUEsS0FBQTtBQUFBLEVBQUEsRUFBQSxHQUFLLFFBQVEsQ0FBQyxhQUFULENBQXVCLFFBQXZCLENBQUwsQ0FBQTtBQUFBLEVBQ0EsRUFBRSxDQUFDLEdBQUgsR0FBUyxDQUFJLE9BQUEsS0FBVyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQWhDLEdBQThDLE9BQTlDLEdBQTJELE1BQTVELENBQUEsR0FDTCx1REFGSixDQUFBO0FBQUEsRUFJQSxFQUFFLENBQUMsSUFBSCxHQUFVLGlCQUpWLENBQUE7QUFBQSxFQUtBLEVBQUUsQ0FBQyxLQUFILEdBQVcsTUFMWCxDQUFBO0FBQUEsRUFNQSxDQUFBLEdBQUksUUFBUSxDQUFDLG9CQUFULENBQThCLFFBQTlCLENBQXdDLENBQUEsQ0FBQSxDQU41QyxDQUFBO1NBT0EsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxZQUFiLENBQTBCLEVBQTFCLEVBQThCLENBQTlCLEVBUkQ7QUFBQSxDQUFBLENBQUgsQ0FBQSxDQWhCQSxDQUFBIiwiZmlsZSI6ImJvb3QuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJcbldlYkZvbnRDb25maWcgPVxuICAgIGdvb2dsZTpcbiAgICAgICAgZmFtaWxpZXM6IFtcbiAgICAgICAgICAgICdBbnRvbidcbiAgICAgICAgICAgICdQYWNpZmljbydcbiAgICAgICAgICAgICdBcnZvOjcwMGl0YWxpYydcbiAgICAgICAgICAgICdQb2Rrb3ZhOjcwMCdcbiAgICAgICAgXVxuICAgIGFjdGl2ZTogLT5cbiAgICAgICAgQ29uZmlncyA9IHJlcXVpcmUgJ0NvbmZpZ3MnXG4gICAgICAgIFNodWZmbGVkQXBwID0gcmVxdWlyZSAnU2h1ZmZsZWQnXG4gICAgICAgIGFwcCA9IG5ldyBTaHVmZmxlZEFwcCBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3Mud2lkdGgsXG4gICAgICAgICAgICBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3MuaGVpZ2h0XG4gICAgICAgIGFwcC5za2V0Y2goKVxuICAgICAgICByZXR1cm5cblxuZG8gLT5cbiAgICB3ZiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ3NjcmlwdCdcbiAgICB3Zi5zcmMgPSAoaWYgJ2h0dHBzJyBpcyBkb2N1bWVudC5sb2NhdGlvbi5wcm90b2NvbCB0aGVuICdodHRwcycgZWxzZSAnaHR0cCcpICtcbiAgICAgICAgJzovL2FqYXguZ29vZ2xlYXBpcy5jb20vYWpheC9saWJzL3dlYmZvbnQvMS93ZWJmb250LmpzJ1xuXG4gICAgd2YudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnXG4gICAgd2YuYXN5bmMgPSAndHJ1ZSdcbiAgICBzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdXG4gICAgcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZSB3Ziwgc1xuIl19