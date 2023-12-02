import dynamic from "next/dynamic";
import NoteFormSkeleton from "./loading";

const NoteForm = dynamic(() => import("../components/NoteForm"), {
	ssr: false,
	loading: () => <NoteFormSkeleton />
})

const NewNotePage = () => {
	return (
		<>
			<NoteForm />
		</>
	);
};

export default NewNotePage;
