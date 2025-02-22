import "./App.css";
import { useState } from "react";

function App() {
	const [job, setJob] = useState("");
	const [jobs, setJobs] = useState(() => {
		const storageJobs = JSON.parse(localStorage.getItem("jobs"));

		return storageJobs ?? [];
	});

	const handleSubmit = () => {
		if (job === "") {
			alert("Please enter a job");
			return [...jobs];
		}
		setJobs((prev) => {
			const newJobs = [...prev, job];

			const jsonJobs = JSON.stringify(newJobs);
			localStorage.setItem("jobs", jsonJobs);

			return newJobs;
		});
		setJob("");
	};

	const handleRemove = (index) => {
		setJobs((prev) => {
			const newJobs = jobs.filter((job) => job !== index);
			const jsonJobs = JSON.stringify(newJobs);

			localStorage.setItem("jobs", jsonJobs);

			return newJobs;
		});
	};

	return (
		<div className="App">
			<input value={job} onChange={(e) => setJob(e.target.value)} />
			<button onClick={handleSubmit}>Submit</button>
			<ul>
				{jobs.map((job, index) => (
					<li key={index}>
						{job}
						<button onClick={() => handleRemove(job)}>
							Remove
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;
