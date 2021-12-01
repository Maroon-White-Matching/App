import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import App from './App';
import Login from './Login'
import HomePage from './HomePage'
import Results from './Results'
import BarChart from './BarChart';
import PieChart from './PieChart';
import { mount, shallow } from 'enzyme';
import { expect as expect2 } from 'chai';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Settings from './Settings';
import NavBar from './NavBar'
import Students from './Students'
import Mentors from './Mentors'
import Search from './Search'
Enzyme.configure({ adapter: new Adapter() });
//npm test -- --coverage --watchAll=false --collectCoverageFrom=!src/index.js

//App.js
test('renders login', () => {
  render(<App />);
  const linkElement = screen.getByText('Login');
  expect(linkElement).toBeInTheDocument();
});

//Login.js
test('renders login form', () => {
  const { queryByTitle } = render(<Login />);
  const form = queryByTitle("loginForm")
  expect(form).toBeTruthy();
});
describe("click login with wrong credentials", () => {
  it("onClick", () => {
    const { queryByTitle } = render(<Login login={() => console.log()} />);
    let alert = queryByTitle("wrongCredentialsAlert")
    expect(alert).toBeFalsy();
    const loginButton = queryByTitle("loginButton")
    const email = queryByTitle("email")
    const password = queryByTitle("password")
    fireEvent.change(email, { target: { value: "test@gmail.com" } })
    fireEvent.change(password, { target: { value: "testttt" } })
    fireEvent.click(loginButton)
    alert = queryByTitle("wrongCredentialsAlert")
    expect(alert).toBeFalsy();
  })
})
it("testing individual functions login false", async () => {
  const wrapper = shallow(<Login login={() => console.log()} />)
  const apiCall = await wrapper.instance().onSubmit({preventDefault:() => console.log()}, "test@gmail.com", "testtt")
  expect2(apiCall).equal(false)
})
it("testing individual functions login false pending", async () => {
  const wrapper = shallow(<Login login={() => console.log()} />)
  const apiCall = await wrapper.instance().onSubmit({preventDefault:() => console.log()}, "pending@gmail.com", "12345")
  expect2(apiCall).equal(false)
})

it("testing individual functions login true", async () => {
  const wrapper = shallow(<Login login={() => console.log() } setRole={() => console.log() }/>)
  const apiCall = await wrapper.instance().onSubmit({preventDefault:() => console.log()}, "tahirgalvez@tamu.edu", "12345")
  sessionStorage.setItem("token", apiCall)
  expect2(apiCall).not.equal(false)
})

describe("click login with correct credentials", () => {
  it("onClick", () => {
    const { queryByTitle } = render(<Login login={() => console.log()} />);
    let alert = queryByTitle("wrongCredentialsAlert")
    expect(alert).toBeFalsy();
    const loginButton = queryByTitle("loginButton")
    const email = queryByTitle("email")
    const password = queryByTitle("password")
    fireEvent.change(email, { target: { value: "test@gmail.com" } })
    fireEvent.change(password, { target: { value: "test" } })
    fireEvent.click(loginButton)
    alert = queryByTitle("wrongCredentialsAlert")
    expect(alert).toBeFalsy();
  })
})
describe("create account all valid", () => {
  it("onClick", () => {
    const { queryByTitle } = render(<Login login={() => console.log()} />);
    let alert = queryByTitle("wrongCredentialsAlert")
    expect(alert).toBeFalsy();
    const CreateAccBttn = queryByTitle("CreateAccBttn")
    fireEvent.click(CreateAccBttn)

    const confirmBtn = queryByTitle("confirmBtn")
    expect(confirmBtn).toBeTruthy()
    const name = queryByTitle("name")
    const email = queryByTitle("email")
    const password = queryByTitle("password")
    const cpassword = queryByTitle("cpassword")
    fireEvent.change(name, { target: { value: "Tahir Galvez" } })
    fireEvent.change(email, { target: { value: "admin@gmail.com" } })
    fireEvent.change(password, { target: { value: "12345" } })
    fireEvent.change(cpassword, { target: { value: "12345" } })
    fireEvent.click(confirmBtn)

    const createdAlert = queryByTitle("createdMess")
    expect(createdAlert).toBeTruthy()

    const backToLogin = queryByTitle("BloginButton")
    fireEvent.click(backToLogin)

    const linkElement = screen.getByText('Login');
    expect(linkElement).toBeInTheDocument();

  })
})

describe("create account no name", () => {
  it("onClick", () => {
    const { queryByTitle } = render(<Login login={() => console.log()} />);
    let alert = queryByTitle("wrongCredentialsAlert")
    expect(alert).toBeFalsy();
    const CreateAccBttn = queryByTitle("CreateAccBttn")
    fireEvent.click(CreateAccBttn)

    const confirmBtn = queryByTitle("confirmBtn")
    expect(confirmBtn).toBeTruthy()
    const name = queryByTitle("name")
    const email = queryByTitle("email")
    const password = queryByTitle("password")
    const cpassword = queryByTitle("cpassword")
    fireEvent.change(email, { target: { value: "admin@gmail.com" } })
    fireEvent.change(password, { target: { value: "12345" } })
    fireEvent.change(cpassword, { target: { value: "12345" } })
    fireEvent.click(confirmBtn)

    const createdAlert = queryByTitle("wrongCredentialsAlert")
    expect(createdAlert).toBeTruthy()
  })
})

describe("create account no email", () => {
  it("onClick", () => {
    const { queryByTitle } = render(<Login login={() => console.log()} />);
    let alert = queryByTitle("wrongCredentialsAlert")
    expect(alert).toBeFalsy();
    const CreateAccBttn = queryByTitle("CreateAccBttn")
    fireEvent.click(CreateAccBttn)

    const confirmBtn = queryByTitle("confirmBtn")
    expect(confirmBtn).toBeTruthy()
    const name = queryByTitle("name")
    const email = queryByTitle("email")
    const password = queryByTitle("password")
    const cpassword = queryByTitle("cpassword")
    fireEvent.change(name, { target: { value: "Tahir Galvez" } })
    fireEvent.change(password, { target: { value: "12345" } })
    fireEvent.change(cpassword, { target: { value: "12345" } })
    fireEvent.click(confirmBtn)

    const createdAlert = queryByTitle("wrongCredentialsAlert")
    expect(createdAlert).toBeTruthy()
  })
})

describe("create account passwords dont match", () => {
  it("onClick", () => {
    const { queryByTitle } = render(<Login login={() => console.log()} />);
    let alert = queryByTitle("wrongCredentialsAlert")
    expect(alert).toBeFalsy();
    const CreateAccBttn = queryByTitle("CreateAccBttn")
    fireEvent.click(CreateAccBttn)

    const confirmBtn = queryByTitle("confirmBtn")
    expect(confirmBtn).toBeTruthy()
    const name = queryByTitle("name")
    const email = queryByTitle("email")
    const password = queryByTitle("password")
    const cpassword = queryByTitle("cpassword")
    fireEvent.change(name, { target: { value: "Tahir Galvez" } })
    fireEvent.change(email, { target: { value: "admin@gmail.com" } })
    fireEvent.change(password, { target: { value: "123456" } })
    fireEvent.change(cpassword, { target: { value: "12345" } })
    fireEvent.click(confirmBtn)

    const createdAlert = queryByTitle("wrongCredentialsAlert")
    expect(createdAlert).toBeTruthy()
  })
})

describe("create account passwords short", () => {
  it("onClick", () => {
    const { queryByTitle } = render(<Login login={() => console.log()} />);
    let alert = queryByTitle("wrongCredentialsAlert")
    expect(alert).toBeFalsy();
    const CreateAccBttn = queryByTitle("CreateAccBttn")
    fireEvent.click(CreateAccBttn)

    const confirmBtn = queryByTitle("confirmBtn")
    expect(confirmBtn).toBeTruthy()
    const name = queryByTitle("name")
    const email = queryByTitle("email")
    const password = queryByTitle("password")
    const cpassword = queryByTitle("cpassword")
    fireEvent.change(name, { target: { value: "Tahir Galvez" } })
    fireEvent.change(email, { target: { value: "admin@gmail.com" } })
    fireEvent.change(password, { target: { value: "1" } })
    fireEvent.change(cpassword, { target: { value: "12345" } })
    fireEvent.click(confirmBtn)

    const createdAlert = queryByTitle("wrongCredentialsAlert")
    expect(createdAlert).toBeTruthy()
  })
})

describe("create then cancel", () => {
  it("onClick", () => {
    const { queryByTitle } = render(<Login login={() => console.log()} />);
    let alert = queryByTitle("wrongCredentialsAlert")
    expect(alert).toBeFalsy();
    const CreateAccBttn = queryByTitle("CreateAccBttn")
    fireEvent.click(CreateAccBttn)

    const cancel = queryByTitle("cancelBtn")
    fireEvent.click(cancel)

    const linkElement = screen.getByText('Login');
    expect(linkElement).toBeInTheDocument();
  })
})

//login js
describe("navbar U", () => {
  it("onClick", async () => {
    const wrapper = shallow(<Login login={() => console.log()} setRole={() => console.log() }/>)
    const apiCall = await wrapper.instance().onSubmit({preventDefault:() => console.log()}, "user@gmail.com", "12345")
    
    sessionStorage.setItem("token", apiCall)
    const { queryByTitle } = render(<NavBar />);
    let navbar = queryByTitle("navbarU")
    expect(navbar).toBeTruthy();
    let cont = queryByTitle("contU")
    expect(cont).toBeTruthy();
    const logoutButton = queryByTitle("logoutBtn")
    fireEvent.click(logoutButton)
    const linkElement = screen.getByText('Login');
    expect(linkElement).toBeInTheDocument();
  })
})

describe("navbar2", () => {
  it("onClick", async () => {
    const wrap = shallow(<Login login={() => console.log()} setRole={() => console.log() }/>)
    const apiCall = await wrap.instance().onSubmit({preventDefault:() => console.log()}, "tahirgalvez@tamu.edu", "12345")
    sessionStorage.setItem("token", await apiCall)

    const { queryByTitle } = render(<NavBar role={'admin'}/>);
    let navbar = queryByTitle("navbar")
    expect(navbar).toBeTruthy();
    let cont = queryByTitle("cont")
    expect(cont).toBeTruthy();
    const logoutButton = queryByTitle("logoutBtn")
    fireEvent.click(logoutButton)
    const linkElement = screen.getByText('Login');
    expect(linkElement).toBeInTheDocument();
  })
})

describe("navbar3", () => {
  it("onClick", async () => {
    const { queryByTitle } = render(<NavBar/>);
    let alert = queryByTitle("wrongCredentialsAlert")
    expect(alert).toBeFalsy();
    const loginButton = queryByTitle("loginButton")
    const email = queryByTitle("email")
    const password = queryByTitle("password")
    fireEvent.change(email, { target: { value: "tahirgalvez@tamu.edu" } })
    fireEvent.change(password, { target: { value: "12345" } })
    fireEvent.click(loginButton)
  })
})


//HomePage.js
test('renders homepage', () => {
  render(<HomePage />);
  const linkElement = screen.getByText('Maroon & White');
  expect(linkElement).toBeInTheDocument();
});

//settings
test('renders settings', async () => {
  const wrapper = shallow(<Login login={() => console.log()} setRole={() => console.log() }/>)
  const apiCall = await wrapper.instance().onSubmit({preventDefault:() => console.log()}, "user@gmail.com", "12345")
  sessionStorage.setItem("token", apiCall)
  
  let wrap2 = shallow(<Settings />)
  let api2 = await wrap2.instance().getUsers('msg')
  let api3 = await wrap2.instance().makeAdmin(1,'admin')
  api3 = await wrap2.instance().makeAdmin(-1,'admin')
  let api4 = await wrap2.instance().delete(-1)
  let err = wrap2.instance().displayError(200)
  err = wrap2.instance().displayError(400)
  
  sessionStorage.setItem("token", apiCall)
  const { queryByTitle } = render(<Settings />);
  const usersTable = queryByTitle("users")
  expect(usersTable).toBeTruthy()
  const makeAdmin = queryByTitle("makeAdmin")
  fireEvent.click(makeAdmin)
  const Delete = queryByTitle("deleteAcc")
  fireEvent.click(Delete)
  const close = queryByTitle("close")
  fireEvent.click(close)
  fireEvent.click(Delete)
  expect(queryByTitle("modal")).toBeTruthy()
  const confirm = queryByTitle("confirm")
  fireEvent.click(confirm)

  // const slider1 = queryByTitle("slider1")
  // fireEvent.change(slider1, { target: { value: 5 } })
  // const slider2 = queryByTitle("slider2")
  // fireEvent.change(slider2, { target: { value: 5 } })
  // const slider3 = queryByTitle("slider3")
  // fireEvent.change(slider3, { target: { value: 5 } })

  const run = queryByTitle("run")
  fireEvent.click(run)

});

//Results.js
describe('render results', () => {
  it("graphs show up", () => {
    const wrapper = shallow(<Results />)
    const BarChart = wrapper.find("BarChart")
    const PieChart = wrapper.find("PieChart")
    expect(BarChart).toBeTruthy();
    expect(PieChart).toBeTruthy();
  })
  it("tables show up", () => {
    const wrapper = shallow(<Results />)
    const studentsTable = wrapper.find("studentsTable")
    const mentorsTable = wrapper.find("mentorsTable")
    const matchesTable = wrapper.find("matchesTable")
    expect(studentsTable).toBeTruthy();
    expect(mentorsTable).toBeTruthy();
    expect(matchesTable).toBeTruthy();

  })
  // it("testing individual functions", async () => {
  //   const wrapper = shallow(<Results />)
  //   const apiCall = await wrapper.instance().getStudents()
  //   expect2(apiCall).equal(true)
  // })

})

//students
describe('render students', async () => {

  const wrapper = shallow(<Login login={() => console.log()} setRole={() => console.log() }/>)
  const apiCall = await wrapper.instance().onSubmit({preventDefault:() => console.log()}, "user@gmail.com", "12345")
  sessionStorage.setItem("token", apiCall)

  let wrap2 = mount(<Students />)
  let api2 = await wrap2.instance().fillstudents('msg')
})
//mentors
describe('render mentors', async() => {

  const wrapper = shallow(<Login login={() => console.log()} setRole={() => console.log() }/>)
  const apiCall = await wrapper.instance().onSubmit({preventDefault:() => console.log()}, "user@gmail.com", "12345")
  sessionStorage.setItem("token", apiCall)

  let wrap2 = mount(<Mentors />)
  let api2 = await wrap2.instance().fillmentors('msg')
})

//search
describe('render search', async () => {
  it("graphs show up", async () => {
    const { queryByTitle } = render(<Search/>)
    let table = queryByTitle("matchesTable")
    expect(table).toBeTruthy();

    const searchbar = queryByTitle("search")
    fireEvent.change(searchbar, { target: { value: "thien" } })

    let wrapper = mount(<Search/>)
    let rowcol = wrapper.find('#row0').simulate('click')
    rowcol = wrapper.find('#close').at(0).simulate('click')
    rowcol = wrapper.find('#row20').simulate('click')

    const wrapper2 = shallow(<Login login={() => console.log()} setRole={() => console.log() }/>)
    const apiCall = await wrapper2.instance().onSubmit({preventDefault:() => console.log()}, "user@gmail.com", "12345")
    sessionStorage.setItem("token", apiCall)

    let wrap2 = mount(<Search />)
    let api2 = await wrap2.instance().populatePeople('msg')
    
  })
})

//barchart.js
test('renders barchart', () => {
  const wrapper = shallow(<BarChart />)
  const barChart = wrapper.find("BarChart")
  expect(barChart).toBeTruthy();
});

//piechart.js
test('renders barchart', () => {
  const wrapper = shallow(<PieChart />)
  const pieChart = wrapper.find("PieChart")
  expect(pieChart).toBeTruthy();
});

