ls.Knob = function(options) {
  this.options = $.extend({}, this.options, options);
  
  // Store reference to jQuery object
  var $el = this.$el = $(options.el);
  
  // Create knob
  $el.knob(this.options);

  // Define a setter to change the value
  Object.defineProperty(this, 'value', {
    set: function(val) {
      $el.val(val).trigger('change');
    }
  });
};

ls.Knob.prototype.options = {
  min: 0,
  max: 30,
  width: 125,
  height: 150,
  angleOffset: -125,
  angleArc: 250,
  fgcolor: '#66EE66'
};