import React from "react";
import { Navigate } from "react-router-dom";
import { UserRole} from "./UserRole";
function PrivateRoute({ children, allowedRoles }) {
const role = UserRole();
console.log(role)
if (role) {
return (
<div>
{allowedRoles.includes(role) ? children:<Navigate to="/" /> }
</div>)
}
else {
return <Navigate to="/login" />;
}
}
export default PrivateRoute;