import {
  useLocation,
  useNavigate,
  useParams,
  redirect
} from "react-router-dom";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        {...{ location, navigate, params, redirect }}
      />
    );
  }

  return ComponentWithRouterProp;
}

export default withRouter