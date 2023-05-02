export default function DataContainer({ isLoading, ip, location, timezone, isp, isValidIp }) {
  return (
    <section className="data-container">
      {isValidIp ? (
        <>
          <article className="data-container__article">
            <h2 className="data-container__header">ip address</h2>
            <strong className="data-container__output data-container__output--ip-address">
              {ip}
            </strong>
          </article>

          <article className="data-container__article">
            <h2 className="data-container__header">location</h2>
            <strong className="data-container__output">
              {isLoading ? <LoadingState /> : location}
            </strong>
          </article>

          <article className="data-container__article">
            <h2 className="data-container__header">timezone</h2>
            <strong className="data-container__output">
              {isLoading ? <LoadingState /> : timezone}
            </strong>
          </article>

          <article className="data-container__article">
            <h2 className="data-container__header">isp</h2>
            <strong className="data-container__output">{isLoading ? <LoadingState /> : isp}</strong>
          </article>
        </>
      ) : (
        <strong className="data-container__warning-info">IP address format is incorrect</strong>
      )}
    </section>
  );
}

function LoadingState() {
  return (
    <div className="text-loading-container">
      <span>Loading</span>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );
}
