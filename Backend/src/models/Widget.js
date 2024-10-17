const WidgetLogic = (widget) => {
  let editing = false;
  let title = widget.title;
  let content = widget.content;

  const handleEditClick = () => {
    editing = true;
  };

  const handleSaveClick = () => {
    // Logic to handle saving the widget's changes
    // For example, you could make a call to update the widget in the database here
    // Replace with actual save functionality as needed
    console.log(`Saving widget ${widget.id} with new title: ${title} and content: ${content}`);
    editing = false;
  };

  const handleDeleteClick = () => {
    // Logic to handle deleting the widget
    // For example, you could make a call to delete the widget from the database here
    console.log(`Deleting widget ${widget.id}`);
  };

  // Return an object containing the logic and state
  return {
    editing,
    title,
    content,
    handleEditClick,
    handleSaveClick,
    handleDeleteClick,
  };
};

module.exports = WidgetLogic;
