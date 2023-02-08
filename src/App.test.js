import { render, screen } from '@testing-library/react';
import { act} from 'react-test-renderer';
import App from './App';
import HotelList from './HotelList';
import Hotel from './Hotel';
import { priceSort } from "./function";

//FUNCTION
//************************/
test('sort function - data should be sorted by price based on request - asc or desc', () => {
  const data= [
    {
      id: "p1",
      offer: {
        displayPrice: {
          amount: 5,
        }
      }
    },
    {
      id: "p2",
      offer: {
        displayPrice: {
          amount: 2,
        }
      }
    },
    {
      id: "p3",
      offer: {
        displayPrice: {
          amount: 10,
        }
      }
    },
  ];

  const sortedAsc = priceSort(data, "asc");
  
  expect(sortedAsc[0].offer.displayPrice.amount === 2).toBeTruthy();
  expect(sortedAsc[1].offer.displayPrice.amount === 5).toBeTruthy();
  expect(sortedAsc[2].offer.displayPrice.amount === 10).toBeTruthy();

  const sortedDesc = priceSort(data, "desc");
  
  expect(sortedDesc[0].offer.displayPrice.amount === 10).toBeTruthy();
  expect(sortedDesc[1].offer.displayPrice.amount === 5).toBeTruthy();
  expect(sortedDesc[2].offer.displayPrice.amount === 2).toBeTruthy();

});

// APP COMPONENT
//************************/
test('first render - page should have heading Q HOTEL', () => {
  render(<App />);
  const linkElement = screen.getByText(/Q HOTEL/i);
  expect(linkElement).toBeInTheDocument();
});

// HOTELLIST COMPONENT
//************************/
test('first render - above search results text should be search low to high as default', () => {
  const hotelData = [];
  render(<HotelList hotels={hotelData} />);
  const sortLowHigh = screen.queryByText(/Sort by price: Low-High/i);
  const sortHighLow = screen.queryByText(/Sort by price: High-Low/i);
  expect(sortLowHigh).toBeInTheDocument();
  expect(sortHighLow).not.toBeInTheDocument();
});

test('on hotel list - click button sort High-Low - expect the text to be changed to Sort by price: High-Low', () => {
  const hotelData = [];
  const  page  = render(<HotelList hotels={hotelData} />);
  const btnHighLow = page.container.querySelector('#btnHighLow');
  act(() => {
    btnHighLow.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  
  const sortLowHigh = screen.queryByText(/Sort by price: Low-High/i);
  const sortHighLow = screen.queryByText(/Sort by price: High-Low/i);
  expect(btnHighLow).not.toBeUndefined();
  expect(sortLowHigh).not.toBeInTheDocument();
  expect(sortHighLow).toBeInTheDocument();
});

test('on hotel list - click button sort Low-High - expect the text to be changed to Sort by price: Low-High', () => {
  const hotelData = [];
  const  page  = render(<HotelList hotels={hotelData} />);
  const btnHighLow = page.container.querySelector('#btnLowHigh');
  act(() => {
    btnHighLow.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  
  const sortLowHigh = screen.queryByText(/Sort by price: Low-High/i);
  const sortHighLow = screen.queryByText(/Sort by price: High-Low/i);
  expect(btnHighLow).not.toBeUndefined();
  expect(sortLowHigh).toBeInTheDocument();
  expect(sortHighLow).not.toBeInTheDocument();
});

// HOTEL COMPONENT
//************************/
test('A single hotel component render - text from data should be displayed correctly', () => {
  const hotel = {
    id: "cxd650nuyo",
    property: {
      propertyId: "P107801",
      title: "Courtyard by Marriott Sydney-North Ryde",
      address: [
        "7-11 Talavera Rd",
        "North Ryde"
      ],
      previewImage: {
        url: "https://unsplash.it/145/125/?random",
        caption: "Image of Courtyard by Marriott Sydney-North Ryde",
        imageType: "PRIMARY"
      },
      rating: {
        ratingValue: 4.5,
        ratingType: "self"
      }
    },
    offer: {
      promotion: {
        title: "Exclusive Deal",
        type: "MEMBER"
      },
      name: "Deluxe Balcony Room",
      displayPrice: {
        amount: 329.000000000,
        currency: "AUD"
      },
      savings: {
        amount: 30.000000000,
        currency: "AUD"
      },
      cancellationOption: {
        cancellationType: "NOT_REFUNDABLE"
      }
    }
  }

  const page = render(<Hotel hotel={hotel} />);
  const title = screen.queryByText(/Courtyard by Marriott Sydney-North Ryde/i);
  const freeCancelText = screen.queryByText(/Free cancellation/i);
  const address = screen.queryByText(/7-11 Talavera Rd, North Ryde/i);
  const circleRating = page.container.querySelector('.circle-rating');
  const starRating = page.container.querySelector('.star-rating');
  expect(freeCancelText).not.toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(address).toBeInTheDocument();
  expect(circleRating).not.toBeUndefined();
  expect(circleRating).not.toBeNull();
  expect(starRating).toBeNull();
});
