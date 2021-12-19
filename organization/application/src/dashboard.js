import React, { Component } from 'react';
import {Card, Button} from "antd";

import {assets} from "./assets";
import {reports} from "./reports";

const Cards = (props) =>
	<div>
		{props.elements.filter(e => e.patientID == props.id || e.doctorID == props.id).map(e => <Card title={e.assetName}>{e.remarks}</Card>)}
	</div>
class Dashboard extends Component {

	logOut = () => {
		this.props.setUser("");
	}

	render() {


		return (
			<div>
				<Button danger onClick={this.logOut}>Log Out</Button>
				<div>
					<h2>Assets</h2>
					<Cards id={this.props.id} elements={assets} />
				</div>
				<div>
					<h2>Reports</h2>
					<Cards id={this.props.id} elements={reports} />
				</div>
			</div>
		);
	}
}

export default Dashboard;
