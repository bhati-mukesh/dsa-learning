export default function App() {

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(event.target)
        console.log(event.target.name.value)
        console.log(event.target.email.value)
        console.log(event.target.message.value)
        console.log(event.target.cars.value)
        console.log(event.target.check.value)
        console.log(event.target.gender.value)
        const formData = new FormData(event.target);
        console.log(Object.fromEntries(formData.entries()))
    }
    
    return <div>
      <form onSubmit={onSubmit}>
          <label for="name">Enter Name</label>
          
          <input type="text" name="name" id="name" placeholder="Name"  />
            <br />
          <label for="email">Enter Email</label>
          
          <input name="email" id="email" placeholder="email" />
          <br />
          <label for="message">Enter Message</label>
          <textarea placeholder="message" name="message" id="message" />
          <br />
          <label>Select Gender</label>
          <br/ >
          <label for="male">Male</label>
          <input type="radio" name="gender" value="male"  id="male" />
          <label for="female">Female</label>
          <input type="radio" name="gender" value="female" id="female" />
          <br/>
          <label for="cars">Choose a car:</label>

            <select name="cars" id="cars">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>

          <br />
          <label for="check">checkBox</label>
          <input type="checkbox" name="check" id="check" />
          
          <br />
          <button type="submit">Submit</button>
      </form>
  </div>
}
