/**
 * ServiceNow Advanced Business Rule
 * Name: Intelligent Assignment Routing Engine
 * Table: Incident [incident]
 * When: Before Insert
 * Filter Condition: Category is not empty AND Assignment Group is empty
 */
(function executeRule(current, previous /*null when async*/) {

	var selectedCategory = current.getValue('category');
	
	if (selectedCategory == 'hardware') {
		current.assignment_group.setDisplayValue('Hardware');
	} 
	else if (selectedCategory == 'software') {
		current.assignment_group.setDisplayValue('Software');
	} 
	else if (selectedCategory == 'network') {
		current.assignment_group.setDisplayValue('Network');
	} 
	else if (selectedCategory == 'database') {
		current.assignment_group.setDisplayValue('Database');
	}
	
	current.work_notes = "Automated routing matrix applied based on Category: " + selectedCategory;

})(current, previous);
