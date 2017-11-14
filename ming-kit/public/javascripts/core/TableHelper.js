'use strict';
require('../lib/bootstrap/css/bootstrap.css');
require('../lib/datatables/datatables.css');
var dataTable=require('../lib/datatables/jquery.dataTables.min.js');
require('../lib/datatables/datatables_bootstrap.css');
var DT_bootstrap=require('../lib/datatables/DT_bootstrap.js');
require('../lib/datatables/responsive.css');
var ResponsiveTable=require('../lib/datatables/ResponsiveTable');
require('../lib/select2/select2.css');
var select2=require('../lib/select2/select2.min.js');
require('../lib/uniform/uniform.css');
var uniform=require('../lib/uniform/jquery.uniform.min.js');
function TableHelper(options){
	_init.call(this);
	_extendTable.call(this);
    _checkable.call(this);
}
function _init(){
	if ($.fn.dataTable) {
        $.extend(true, $.fn.dataTable.defaults, {
            oLanguage: {
                sSearch: ""
            },
            sDom: "<'row'<'dataTables_header clearfix'<'col-md-6'l><'col-md-6'f>r>>t<'row'<'dataTables_footer clearfix'<'col-md-6'i><'col-md-6'p>>>",
            iDisplayLength: 5,
            fnDrawCallback: function() {
                if ($.fn.uniform) {
                    $(":radio.uniform, :checkbox.uniform").uniform()
                }
                if ($.fn.select2) {
                    $(".dataTables_length select").select2({
                        minimumResultsForSearch: "-1"
                    })
                }
                var o = $(this).closest(".dataTables_wrapper").find("div[id$=_filter] input");
                if (o.parent().hasClass("input-group")) {
                    return
                }
                o.addClass("form-control");
                o.wrap('<div class="input-group"></div>');
                o.parent().prepend('<span class="input-group-addon"><i class="icon-search"></i></span>')
            }
        });
        $.fn.dataTable.defaults.aLengthMenu = [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]];
    }
}
function _extendTable(){
	$(".datatable").each(function() {
        var w = $(this);
        var y = {};
        var s = w.data("datatable");
        if (typeof s != "undefined") {
            $.extend(true, y, s)
        }
        var x = w.data("displayLength");
        if (typeof x != "undefined") {
            $.extend(true, y, {
                iDisplayLength: x
            })
        }
        var r = w.data("horizontalWidth");
        if (typeof r != "undefined") {
            $.extend(true, y, {
                sScrollX: "100%",
                sScrollXInner: r,
                bScrollCollapse: true
            })
        }
        if (w.hasClass("table-checkable")) {
            $.extend(true, y, {
                aoColumnDefs: [{
                    bSortable: false,
                    aTargets: [0]
                }]
            })
        }
        if (w.hasClass("table-tabletools")) {
            $.extend(true, y, {
                sDom: "<'row'<'dataTables_header clearfix'<'col-md-4'l><'col-md-8'Tf>r>>t<'row'<'dataTables_footer clearfix'<'col-md-6'i><'col-md-6'p>>>",
                oTableTools: {
                    aButtons: ["copy", "print", "csv", "xls", "pdf"],
                    sSwfPath: "plugins/datatables/tabletools/swf/copy_csv_xls_pdf.swf"
                }
            })
        }
        if (w.hasClass("table-colvis")) {
            $.extend(true, y, {
                sDom: "<'row'<'dataTables_header clearfix'<'col-md-6'l><'col-md-6'Cf>r>>t<'row'<'dataTables_footer clearfix'<'col-md-6'i><'col-md-6'p>>>",
                oColVis: {
                    buttonText: "Columns <i class='icon-angle-down'></i>",
                    iOverlayFade: 0
                }
            })
        }
        if (w.hasClass("table-tabletools") && w.hasClass("table-colvis")) {
            $.extend(true, y, {
                sDom: "<'row'<'dataTables_header clearfix'<'col-md-6'l><'col-md-6'TCf>r>>t<'row'<'dataTables_footer clearfix'<'col-md-6'i><'col-md-6'p>>>",
            })
        }
        if (w.hasClass("table-checkable") && w.hasClass("table-colvis")) {
            $.extend(true, y, {
                oColVis: {
                    aiExclude: [0]
                }
            })
        }
        if (w.hasClass("table-responsive")) {
            var q;
            var p = {
                tablet: 1024,
                phone: 480
            };
            var t = $.fn.dataTable.defaults.fnDrawCallback;
            $.extend(true, y, {
                bAutoWidth: false,
                fnPreDrawCallback: function() {
                    if (!q) {
                        q = new ResponsiveTable(this, p);
                    }
                },
                fnRowCallback: function(C, B, A, z) {
                    q.createExpandIcon(C)
                },
                fnDrawCallback: function(z) {
                    t.apply(this, z);
                    q.respond()
                }
            })
        }
        var v = w.data("datatableFunction");
        if (typeof v != "undefined") {
            $.extend(true, y, window[v]())
        }
        if (w.hasClass("table-columnfilter")) {
            var u = {};
            var o = w.data("columnfilter");
            if (typeof o != "undefined") {
                $.extend(true, u, o)
            }
            $(this).dataTable(y).columnFilter(u);
            w.find(".filter_column").each(function() {
                var z = w.data("columnfilterSelect2");
                if (typeof z != "undefined") {
                    $(this).children("input").addClass("form-control");
                    $(this).children("select").addClass("full-width-fix").select2({
                        placeholderOption: "first"
                    })
                } else {
                    $(this).children("input, select").addClass("form-control")
                }
            })
        } else {
            $(this).dataTable(y)
        }
    })
}
function _checkable(){
    $(".table-checkable thead th.checkbox-column :checkbox").on("change",
    function() {
        var z = $(this).prop("checked");
        var x = $(this).parents("table.table-checkable").data("horizontalWidth");
        if (typeof x != "undefined") {
            var y = $(this).parents(".dataTables_scroll").find(".dataTables_scrollBody tbody")
        } else {
            var y = $(this).parents("table").children("tbody")
        }
        y.each(function(B, A) {
            $(A).find(".checkbox-column").each(function(D, C) {
                var E = $(":checkbox", $(C)).prop("checked", z).trigger("change");
                if (E.hasClass("uniform")) {
                    $.uniform.update(E)
                }
                $(C).closest("tr").toggleClass("checked", z)
            })
        })
    });
    $(".table-checkable tbody tr td.checkbox-column :checkbox").on("change",
    function() {
        var x = $(this).prop("checked");
        $(this).closest("tr").toggleClass("checked", x)
    });
    $(".datatable.table-checkable").bind("draw",
    function() {
        var y = $("tbody tr td.checkbox-column :checkbox", this).length;
        var A = $("tbody tr td.checkbox-column :checkbox:checked", this).length;
        var z = $("thead th.checkbox-column :checkbox", this);
        var x = false;
        if (y == A && y != 0) {
            x = true
        } else {
            x = false
        }
        z.prop("checked", x);
        if (z.hasClass("uniform")) {
            $.uniform.update(z)
        }
    })
}
module.exports=TableHelper;