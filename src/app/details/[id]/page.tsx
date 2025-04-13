export default function Details({ params }) {
  const { id } = params;
  return <div>{`Event ID: ${id}`}</div>;
}
