import React from 'react';
import Forms from '../Forms/Forms';
import Location from '../components/Location';
import DateAndLocation from '../components/DateAndLocation';
import { MercerLogo } from '../variables-urls/ImageUrls';
import '../App.css';
import '../styles/HomePage.css';
 
// style={{
// 			'font-weight': '500', 'font-size': 'large', 'display': 'grid',
// 			'grid-template-columns': '1fr 1fr', 'padding': '30px', 'gap': '40px'}}
function Home() {
	return (

		<div className="container" id='HomeMaindiv' style={{
				'font-weight': '500', 'font-size': 'large', 'display': 'grid',
					'grid-template-columns': '1fr 1fr', 'padding': '30px', 'gap': '40px'}}
		>
			<Forms id="forms" ></Forms>
			<div className="abc">
				<img className="mercerLogo" src={`${MercerLogo}`} alt='This is image' style={{ height: '40vh', margin: '0px', 'padding-top': '0px', width: '100vh', opacity: 0.5, }} />
				<div className="LocationAndTime" style={{ 'grid-area': 'footer', display: 'flex', 'margin-top': '50px', 'margin-left': '200px', alignSelf: 'end', gap: '70px', color: 'white', position: 'relative' }}>
					<Location id="location" />
					<DateAndLocation id="date" />
				</div>
			</div>
		</div>
	);
}

export default Home;




{/* <div className="container" style={{
			'font-weight': '500', 'font-size': 'large', 'display': 'grid', 'grid-template-rows': 'auto 1fr',
			'grid-template-columns': '1fr 1fr', 'grid-temolate-areas': "left right footer footer"
		}}>
			<Forms id="forms" style={{ 'display': 'inline', 'grid-area': 'left' }}></Forms>
			<div>
				<img src='https://assetsprelogin.mettl.com/_next/image/?url=%2Fassets%2Flogo%2FMercer-Mettl.svg&w=640&q=75' alt='This is image' style={{ height: '70vh', width: '80vh', 'position': 'absolute', opacity: 0.5, 'grid-area': 'top', 'margin-bottom': '0', 'margin-left': 650 }} />
			<div style={{ 'grid-area': 'footer', display: 'flex', gap: '70px', color: 'white', position: 'relative' }}>
				<Location id="location" />
				<DateAndLocation id="date" />
			</div>
			</div>


		</div> */}