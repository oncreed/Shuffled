var WebFontConfig;

WebFontConfig = {
  google: {
    families: ['Snippet', 'Pacifico', 'Arvo:700italic', 'Podkova:700']
  },
  active: function() {
    var ShuffledApp, app;
    ShuffledApp = require('shuffled');
    app = new ShuffledApp(800, 600);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvb3QuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLElBQUEsYUFBQTs7QUFBQSxhQUFBLEdBQ0k7QUFBQSxFQUFBLE1BQUEsRUFDSTtBQUFBLElBQUEsUUFBQSxFQUFVLENBQ04sU0FETSxFQUVOLFVBRk0sRUFHTixnQkFITSxFQUlOLGFBSk0sQ0FBVjtHQURKO0FBQUEsRUFPQSxNQUFBLEVBQVEsU0FBQSxHQUFBO0FBQ0osUUFBQSxnQkFBQTtBQUFBLElBQUEsV0FBQSxHQUFjLE9BQUEsQ0FBUSxVQUFSLENBQWQsQ0FBQTtBQUFBLElBQ0EsR0FBQSxHQUFVLElBQUEsV0FBQSxDQUFZLEdBQVosRUFBaUIsR0FBakIsQ0FEVixDQUFBO0FBQUEsSUFFQSxHQUFHLENBQUMsTUFBSixDQUFBLENBRkEsQ0FESTtFQUFBLENBUFI7Q0FESixDQUFBOztBQUFBLENBY0csU0FBQSxHQUFBO0FBQ0MsTUFBQSxLQUFBO0FBQUEsRUFBQSxFQUFBLEdBQUssUUFBUSxDQUFDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBTCxDQUFBO0FBQUEsRUFDQSxFQUFFLENBQUMsR0FBSCxHQUFTLENBQUksT0FBQSxLQUFXLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBaEMsR0FBOEMsT0FBOUMsR0FBMkQsTUFBNUQsQ0FBQSxHQUNMLHVEQUZKLENBQUE7QUFBQSxFQUlBLEVBQUUsQ0FBQyxJQUFILEdBQVUsaUJBSlYsQ0FBQTtBQUFBLEVBS0EsRUFBRSxDQUFDLEtBQUgsR0FBVyxNQUxYLENBQUE7QUFBQSxFQU1BLENBQUEsR0FBSSxRQUFRLENBQUMsb0JBQVQsQ0FBOEIsUUFBOUIsQ0FBd0MsQ0FBQSxDQUFBLENBTjVDLENBQUE7U0FPQSxDQUFDLENBQUMsVUFBVSxDQUFDLFlBQWIsQ0FBMEIsRUFBMUIsRUFBOEIsQ0FBOUIsRUFSRDtBQUFBLENBQUEsQ0FBSCxDQUFBLENBZEEsQ0FBQSIsImZpbGUiOiJib290LmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiXG5XZWJGb250Q29uZmlnID1cbiAgICBnb29nbGU6XG4gICAgICAgIGZhbWlsaWVzOiBbXG4gICAgICAgICAgICAnU25pcHBldCdcbiAgICAgICAgICAgICdQYWNpZmljbydcbiAgICAgICAgICAgICdBcnZvOjcwMGl0YWxpYydcbiAgICAgICAgICAgICdQb2Rrb3ZhOjcwMCdcbiAgICAgICAgXVxuICAgIGFjdGl2ZTogLT5cbiAgICAgICAgU2h1ZmZsZWRBcHAgPSByZXF1aXJlICdzaHVmZmxlZCdcbiAgICAgICAgYXBwID0gbmV3IFNodWZmbGVkQXBwIDgwMCwgNjAwXG4gICAgICAgIGFwcC5za2V0Y2goKVxuICAgICAgICByZXR1cm5cblxuZG8gLT5cbiAgICB3ZiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ3NjcmlwdCdcbiAgICB3Zi5zcmMgPSAoaWYgJ2h0dHBzJyBpcyBkb2N1bWVudC5sb2NhdGlvbi5wcm90b2NvbCB0aGVuICdodHRwcycgZWxzZSAnaHR0cCcpICtcbiAgICAgICAgJzovL2FqYXguZ29vZ2xlYXBpcy5jb20vYWpheC9saWJzL3dlYmZvbnQvMS93ZWJmb250LmpzJ1xuXG4gICAgd2YudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnXG4gICAgd2YuYXN5bmMgPSAndHJ1ZSdcbiAgICBzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdXG4gICAgcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZSB3Ziwgc1xuIl19