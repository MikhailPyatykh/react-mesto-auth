import { Link } from "react-router-dom";

function PageWithForm(props) {
  return (
    <section>
      <form className="page__inputs" name={`${props.name}`} onSubmit={props.onSubmit}>
        <h3 className="page__heading">{props.title}</h3>
        {props.children}
        <button type="submit" className="page__submit-btn">
          {props.submitText}
        </button>
        {props.description ? (
          <span className="page__description">
            {props.description}&nbsp;
            <Link to={props.link} className="page__signin-btn">
              {props.signin}
            </Link>
          </span>
        ) : (
          ""
        )}
      </form>
    </section>
  );
}

export default PageWithForm;
