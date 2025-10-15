import { useEffect, useRef } from "react";

type ModalProps = {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
};
export function Modal({ open, onClose, children }: ModalProps) {
	const ref = useRef<HTMLDialogElement>(null);
	useEffect(() => {
		const d = ref.current;
		if (!d) return;
		if (open && !d.open) d.showModal();
		if (!open && d.open) d.close();
	}, [open]);
	return (
		<dialog
			ref={ref}
			className="backdrop:bg-black/50 rounded-xl p-0 max-w-4xl w-[96vw]"
			onClose={onClose}
		>
			<div className="p-4">
				<div className="flex justify-end">
					<button
						type="button"
						onClick={onClose}
						className="px-3 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-sm"
					>
						Cerrar
					</button>
				</div>
				<div className="pt-2">{children}</div>
			</div>
		</dialog>
	);
}
