function Util() {
    this.findById = function(w, id) {
        for (var x in w.children) {
            if (w.children[x].id == id) return w.children[x];
            return null;
        }
    };
    this.addNoDataMessage = function(tableView, message) {
        var noDataRow = Ti.UI.createTableViewRow({
            title: message,
            hasChild: false,
            height: 35
        });
        var rows = [ noDataRow ];
        tableView.setData(rows);
    };
    this.isEmail = function(email) {
        var atpos = email.indexOf("@");
        var dotpos = email.lastIndexOf(".");
        return 1 > atpos || atpos + 2 > dotpos || dotpos + 2 >= email.length ? false : true;
    };
}

module.exports = Util;