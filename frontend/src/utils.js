import moment from 'moment/moment';

const baseUrl = 'https://obed.sherstneva.cz/api';
export const restaurantsEndpoint = baseUrl + '/restaurants';
export const addRestaurantEndpoint = restaurantsEndpoint + '/add';
export const votesEndpoint = baseUrl + '/votes';
export const addVoteEndpoint = baseUrl + '/votes/add';

export const createRestaurant = (
  name,
  setSubmitting,
  setRequestError,
  setRefreshData
) => {
  let formdata = new FormData();

  formdata.append('restaurant', `{"name": "${name}"}`);

  const requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };

  fetch(addRestaurantEndpoint, requestOptions)
    .then((response) => {
      setSubmitting(false);
      if (response.ok) {
        setRefreshData(Math.random());
        return;
      }
      return Promise.reject(response);
    })
    .catch((response) => {
      response.text().then((error) => {
        setRequestError(error);
      });
    });
};

export const getVotes = (setVotes) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  fetch(votesEndpoint, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      setVotes(parseVotes(result));
    })
    .catch((error) => console.log('error', error));
};

export const getRestaurants = (setRestaurants) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  fetch(restaurantsEndpoint, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      setRestaurants(result);
    })
    .catch((error) => console.log('error', error));
};

export const addVote = (
  personName,
  restaurantId,
  setSubmitting,
  setRequestError,
  setRefreshData
) => {
  let formdata = new FormData();

  formdata.append(
    'vote',
    `{"personName": "${personName}", "restaurantId": "${restaurantId}"}`
  );

  const requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };

  fetch(addVoteEndpoint, requestOptions)
    .then((response) => {
      setSubmitting(false);
      if (response.ok) {
        setRefreshData(Math.random());
        return;
      }
      return Promise.reject(response);
    })
    .catch((response) => {
      response.text().then((error) => {
        setRequestError(error);
        console.log(error);
      });
    });
};

const parseVotes = (votes) => {
  let parsedVotes = new Map();
  votes.forEach((vote) => {
    const dateTime = moment(vote.createdAt);
    const date = dateTime.endOf('day').format();
    let dateVotes = parsedVotes.get(date);
    if (dateVotes) {
      dateVotes.push(vote);
      parsedVotes.set(date, dateVotes);
    } else {
      parsedVotes.set(date, new Array(vote));
    }
  });

  parsedVotes = new Map(
    [...parsedVotes.entries()].sort(
      (date1, date2) => moment(date2[0]) - moment(date1[0])
    )
  );

  return parsedVotes;
};
