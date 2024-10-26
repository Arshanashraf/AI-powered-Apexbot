import { ReactNode, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface ProtectedProps {
    children: ReactNode;
    authentication?: boolean;
}

export default function Protected({ children, authentication = true }: ProtectedProps) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((state: { auth: { status: boolean | null } }) => state.auth.status);

    useEffect(() => {
        // Redirect to login if `authentication` is true and user is not authenticated
        if (authentication && authStatus === false) {
            navigate("/login");
        }
        // Redirect to home if `authentication` is false and user is authenticated
        else if (!authentication && authStatus === true) {
            navigate("/");
        }
        // Set loader to false only after checking conditions
        else {
            setLoader(false);
        }
    }, [authStatus, navigate, authentication]);

    return loader ? <h1>Loading...</h1> : <>{children}</>;
}
