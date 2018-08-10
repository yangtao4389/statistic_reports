var TableAdvanced = function () {

     var initTable2 = function() {
        var oTable = $('#sample_2').dataTable( {
            "aoColumnDefs": [{
                'bSortable': false,
                'aTargets': [0]
            }
            ],
            "aaSorting": [[1, 'asc']],
             "aLengthMenu": [
                [5, 15, 20, -1],
                [5, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "iDisplayLength": 20,
            "sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
            "sPaginationType": "bootstrap",
            "oLanguage": {
                "sLengthMenu": "_MENU_ 每页显示多少条数据",
                "oPaginate": {
                    "sPrevious": "上一页",
                    "sNext": "下一页"
                },
                "sInfo": "此页显示第 _START_ 到 _END_ 条数据，总共 _TOTAL_ 条记录",
                "sInfoEmpty": "此页暂时没有数据",
                "sLoadingRecords": "正在玩命加载...",
                "sSearch": "搜索:",
                "sZeroRecords": "没有匹配的记录"


            }

        });

        jQuery('#sample_2_wrapper .dataTables_filter input').addClass("m-wrap small"); // modify table search input
        jQuery('#sample_2_wrapper .dataTables_length select').addClass("m-wrap small"); // modify table per page dropdown
        jQuery('#sample_2_wrapper .dataTables_length select').select2(); // initialzie select2 dropdown


         $('#sample_2_column_toggler input[type="checkbox"]').change(function(){
            /* Get the DataTables object again - this is not a recreation, just a get of the object */
            var iCol = parseInt($(this).attr("data-column"));
            var bVis = oTable.fnSettings().aoColumns[iCol].bVisible;
            oTable.fnSetColumnVis(iCol, (bVis ? false : true));
        });

         jQuery('#sample_2 .group-checkable').change(function () {
             var set = jQuery(this).attr("data-set");
             var checked = jQuery(this).is(":checked");
             jQuery(set).each(function () {
                 if (checked) {
                     $(this).attr("checked", true);
                 } else {
                     $(this).attr("checked", false);
                 }
             });
             jQuery.uniform.update(set);
         });


    }

    return {

        //main function to initiate the module
        init: function () {
            
            if (!jQuery().dataTable) {
                return;
            }
            initTable2();
        }

    };

}();