const Notification = ({ message }) => {
	const notificationStyle = {
		color: message.color ?? "green",
		background: "lightgrey",
		fontSize: 20,
		borderStyle: "solid",
		borderRadius: 5,
		padding: 10,
		marginBottom: 10,
	}

	if (message.text)
		return (
			<div style={notificationStyle}>
				{message.text}
			</div>
		);

	return (<></>)
}

export default Notification;