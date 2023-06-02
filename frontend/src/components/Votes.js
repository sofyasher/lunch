import React, { useEffect, useState } from 'react';
import { getVotes } from '../utils';
import { Accordion, Card, Col, Container, Row } from 'react-bootstrap';
import moment from 'moment/moment';
import Chart from './Chart';

const Votes = ({ refreshData }) => {
  let [votes, setVotes] = useState([]);
  useEffect(() => {
    getVotes(setVotes);
    const interval = setInterval(() => getVotes(setVotes), 15000);
    return () => clearInterval(interval);
  }, [refreshData]);
  const today = moment().endOf('day');
  const todayFormatted = today.format();
  const todaysVotes = votes.size > 0 ? votes?.get(todayFormatted) : [];
  return (
    <>
      <Card border="secondary" className="mb-3 mt-4">
        <Card.Header>{today.format('MMMM Do YYYY')}</Card.Header>
        <Card.Body>
          <Row>
            {todaysVotes ? (
              <>
                <Col>
                  <Chart data={todaysVotes} />
                </Col>
                <Col>
                  {todaysVotes.map((v) => (
                    <li>
                      {v.personName}: {v.restaurantName}
                    </li>
                  ))}
                </Col>
              </>
            ) : (
              <span className="no-votes-note">We need YOUR VOTE!!!</span>
            )}
          </Row>
        </Card.Body>
      </Card>
      <Accordion alwaysOpen={true}>
        {[...votes.keys()]
          .filter((date) => date !== todayFormatted)
          .map((date) => (
            <Accordion.Item eventKey={date}>
              <Accordion.Header>
                {moment(date).format('MMMM Do YYYY')}
              </Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col>
                    <Chart data={votes.get(date)} />
                  </Col>
                  <Col>
                    {votes.get(date).map((v) => (
                      <li>
                        {v.personName}: {v.restaurantName}
                      </li>
                    ))}
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          ))}
      </Accordion>
    </>
  );
};

export default Votes;
