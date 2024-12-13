async function getData() {
    const res = await fetch("api/quotes");
    const data = await res.json();
    return data;
}

export default getData;