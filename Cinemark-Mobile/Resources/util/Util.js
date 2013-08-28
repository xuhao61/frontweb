function Util() {
    this.findById = function(w, id) {
        for (var x in w.children) {
            if (w.children[x].id == id) return w.children[x];
            return null;
        }
    };
}

module.exports = Util;