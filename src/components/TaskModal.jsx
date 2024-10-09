// src/components/TaskModal.js

import React from "react";
import PropTypes from "prop-types";

const TaskModal = ({ task, isOpen, onClose }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
			<div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
				<h2 className="text-xl font-bold mb-4">{task?.title}</h2>
				<p className="text-gray-700 mb-4">{task?.description || "No description available."}</p>
				<span className="text-yellow-500 font-semibold">{task?.point} WOOF</span>
				<div className="mt-4 flex justify-end">
					<button
						className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
						onClick={onClose}
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

TaskModal.propTypes = {
	task: PropTypes.shape({
		title: PropTypes.string.isRequired,
		description: PropTypes.string,
		point: PropTypes.number.isRequired,
	}).isRequired,
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default TaskModal;
