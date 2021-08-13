const RequestRow = ({ requests }) => {
  console.log(requests.length);
  return requests.map((request, index) => {
    return (
      <>
        <div>Request!!!</div>
      </>
    );
  });
};

export default RequestRow;
