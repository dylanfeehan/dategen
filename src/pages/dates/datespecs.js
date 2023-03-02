import {useLocation} from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import Accordion from 'react-bootstrap/Accordion';
import '../../App.css'

const DateSpecs = () => {
  const location = useLocation();
  const data = location.state.data;
  console.log(data)
  return (
    <div>
    {/*<Card.Img src={data.image} />*/}
    <div className='name-and-link'>
      <h1 style={{paddingLeft: '1rem', paddingTop:"1rem"}}>{data.title}</h1>
      <div className="sidebysidelinks">
        <a href={data.directions} target="_blank" className="spec-link">
        <Button variant="outline-dark">Directions</Button>
        </a>
        <a href={data.site} target="_blank" className="spec-link">
        <Button variant="outline-dark">Website</Button>
        </a>
      </div>
    </div>

    <Accordion defaultActiveKey="0" alwaysOpen="true">
      <Accordion.Item eventKey="0" >
        <Accordion.Header>About</Accordion.Header>
        <Accordion.Body>
          {data.details}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1" >
        <Accordion.Header>Notes</Accordion.Header>
        <Accordion.Body>
          {data.notes}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2" >
        <Accordion.Header>Reservations / Preparation</Accordion.Header>
        <Accordion.Body>
          {data.reservations}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </div>
  );
}
export default DateSpecs;