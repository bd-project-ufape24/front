import React, { useState, useEffect } from "react";
import "./box-content.css";

export const BoxContent = ({ question, text, result, loading, onExecute }) => {
	const [showModal, setShowModal] = useState(false);
	const [visibleCells, setVisibleCells] = useState(0);

	const handleToggleResult = () => {
		if (!showModal) {
			onExecute();
		}
		setShowModal(!showModal);
	};

	const handleReprocess = () => {
		onExecute();
		setShowModal(true);
		setVisibleCells(0);
	};

	useEffect(() => {
		let timer;
		if (showModal && result && Array.isArray(result)) {
			timer = setInterval(() => {
				setVisibleCells((prevVisibleCells) => {
					if (
						prevVisibleCells <
						result.length * Object.keys(result[0]).length
					) {
						return prevVisibleCells + 1;
					}
					return prevVisibleCells;
				});
			}, 100);
		}
		return () => clearInterval(timer);
	}, [showModal, result]);

	const renderTable = (data) => {
		if (!data || !Array.isArray(data) || data.length === 0) {
			return <p>Sem dados para exibir.</p>;
		}

		const headers = Object.keys(data[0]);
		let cellCounter = 0;

		return (
			<table className="table table-bordered">
				<thead>
					<tr>
						{headers.map((header) => (
							<th key={header}>{header}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map((item, index) => (
						<tr key={index}>
							{headers.map((header) => {
								cellCounter++;
								return (
									<td key={header}>
										{cellCounter <= visibleCells ? (
											item[header] ?? " - "
										) : (
											<span>&nbsp;</span>
										)}
									</td>
								);
							})}
						</tr>
					))}
				</tbody>
			</table>
		);
	};

	return (
		<div className={`col-md-6 mb-4 d-flex`}>
			<div className="card h-100 d-flex flex-column">
				<div className="card-body d-flex flex-column flex-grow-1">
					<h5 className="card-title">Questão {question}</h5>
					<h6 className="card-subtitle mb-2 text-muted">
						Descrição da Questão
					</h6>
					<p className="card-text">{text}</p>

					<button
						className="btn btn-primary mt-auto mb-2"
						onClick={handleToggleResult}
					>
						Executar
					</button>
				</div>
			</div>

			{showModal && (
				<div className="modal show d-block" tabIndex="-1">
					<div className="modal-dialog modal-lg">
						<div className="modal-content">
							<div className="modal-header">
								{/* Centraliza o título */}
								<h5 className="modal-title w-100 text-center">
									Questão {question}
								</h5>
								<button
									type="button"
									className="btn-close"
									onClick={() => setShowModal(false)}
								></button>
							</div>
							<div className="modal-body">
								{loading ? (
									<p>Carregando...</p>
								) : (
									<div className="result-container">
										{Array.isArray(result) ? (
											renderTable(result)
										) : (
											<p>Erro ao carregar os dados.</p>
										)}
									</div>
								)}
							</div>
							<div className="modal-footer">
								<button className="btn btn-secondary" onClick={handleReprocess}>
									Reprocessar
								</button>
								<button
									className="btn btn-primary"
									onClick={() => setShowModal(false)}
								>
									Fechar
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
