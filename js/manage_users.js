$(document).ready(function(){

	$("#users_datatable").dataTable({
        "processing": true,
        "serverSide": true,
        "ajax": "ajax/users_processing.php",
		"dom": "<\"col-xs-8\"l><\"col-xs-4\"f><\"col-sm-8 col-xs-12\"i><\"col-sm-4 col-xs-12\"p><\"col-xs-12\"t><\"col-sm-8 col-xs-12\"i><\"col-sm-4 col-xs-12\"p>r",
		"drawCallback": function (settings) {
				placeEditors();
			}
    });
	
	function placeEditors() {
		$("#users_datatable tbody tr").each( function () {
		
			//declare users_datatable var
			//to correspond to
			//datatables API instance
			var users_datatable = $("#users_datatable").DataTable();
	
			var userdata = users_datatable.cell(this, 1).data();
			var usernode = users_datatable.cell(this, 1).node();
			var usercol = $(usernode)
				.html('<p>' + userdata + '</p><a href="edit_user.php?user=' + userdata + '"><p>Edit User Details</p></a><a href="delete_user.php?user=' + userdata + '" onclick="return confirm(\'Are You Sure?\')"><p>Delete User</p></a>');
		});
	}

});