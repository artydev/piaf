import { useRef, useState } from 'react';
import b from 'bss'
import { TbBackground } from 'react-icons/tb';

const dropZoneInactive = b`
	background red
`.class

const dropZoneActive = b`
	background yellow
`.class

export function DragAndDrop() {

	const [dragActive, setDragActive] = useState(false);
	const inputRef = useRef(null);
	const [files, setFiles] = useState([]);

	const handleDragEnter = () => setDragActive(true);

	const handleDragLeave = () => setDragActive(false);

	const handleDrop = (event) => {
		event.preventDefault();
		setFiles([...files, ...Array.from(event.dataTransfer.files)]);
		setDragActive(false);
	};

	const handleDragOver = (event) => {
		event.preventDefault();
		setDragActive(true);
	};

	const handleChange = (event) => {
		setFiles([...files, ...event.target.files]);
	};

	const removeFile = (fileName) => {
		setFiles(files.filter((file) => file.name !== fileName));
	};

	return (
		<div>
			<div
				className={dragActive ? dropZoneInactive : dropZoneActive}
				onDragEnter={handleDragEnter}
				onDragLeave={handleDragLeave}
				onDragOver={handleDragOver}
				onDrop={handleDrop}
			>
				<h2>Glisser et Déposer vos fichiers</h2>
				<input
					ref={inputRef}
					type="file"
					style={{ display: "none" }}
					onChange={handleChange}
					multiple
				/>
				<button onClick={() => inputRef.current.click()} >Select Files</button>
				<ul className="">
					{files.map((file, index) => (
						<li key={index} className="">
							{file.name} <button onClick={() => removeFile(file.name)} className="">Remove</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}


export default DragAndDrop