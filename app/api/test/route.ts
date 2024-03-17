export async function POST(request: Request) {
	// const dat = await request.json();
	// console.log(dat);

	const res = await fetch("http://localhost:5228/api/auth/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			FirstName: "test",
			LastName: "test",
			Email: "test",
			Password: "testtestt",
		}),
	});

	const data = await res.json();

    if(res.status === 400){
        return Response.json(data, { status: 400 });
    }

	console.log(data);
	return Response.json(data);
}
