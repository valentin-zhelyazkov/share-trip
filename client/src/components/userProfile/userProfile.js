import './userProfile.css';

const UserProfile = () => {
    return (
        <>
            <table className="expenses-info">
                <thead>
                    <tr>
                        <th colSpan="2">Expenses</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Total Amount:</td>
                        <td>num</td>
                    </tr>
                    <tr>
                        <td>Total Merches</td>
                        <td>length</td>
                    </tr>
                </tbody>
            </table>

            <div className="current-amount">
                <p>Available amount: <span>amount</span></p>
            </div>
        </>
    )
}

export default UserProfile;
