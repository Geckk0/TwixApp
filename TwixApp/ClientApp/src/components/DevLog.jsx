import About from './About'
import '../styles/DevLog.css'

function DevLog() {

  const fullLog = [
    {
      year: "2023",
      logs: [
        //Fast copy/paste template
        // {date: "",
        // title: "",
        // desc: ""},

        {date: "06/09",
        title: "Authentication has been added!",
        desc: "When logging in you now generate an authentication token that is unique for you. \
          It lets you stay logged in for up to two hours if you refresh or close the page. \
          And it also verifies users when posting, archiving or deleting pops for everyones safety."},

        {date: "01/09",
        title: "Handle your pops!",
        desc: "After some trial and error the pops are now mostly working. \
          After adding one to your collection you can not move it to your archive and remove it from your main collection, this does not delete your pop. \
          When a pop is in your archive you then have the ability to bring it back to your collection or permanently delete it. \
          Saving pops can be useful if you want to keep track of old pops you had before and get them back again."},

        {date: "25/08",
        title: "Pops can be posted",
        desc: "I have opened the pops section again and now it is possible to post pops to the site. \
          It is not perfect yet and they are not removable either. \
          Currently, the POST for a new pop returns an error but the pop gets added, need to fix soon. \
          Rating, sorting and other functions are coming soon."},

        {date: "24/08",
        title: "It has been published!",
        desc: "The website is now public to anyone with the link. I hope I can keep it up as long as I want to. \
        Now I can finally return to adding new features I have planed. \
        But until further notice the 'Pops' section will be closed as I am still working on it."},

        {date: "22/08",
        title: "Published the first verision",
        desc: "The database, back-end and frontend should all be up. It is not publically available yet, but soon it will be. \
          I still have some fixing to do before opening up to the public. Hopefully by the end of the week I'm done. \
          Now I need to add an API call to add and remove pops for the database and a UI for it."},

        {date: "18/08",
        title: "Github/Devops",
        desc: "Everything is finally being tracked on github and I will try to save my updates there regularly. \
          I also set up a devops project to keep track of what I want to do and have left. Clear goals make it easier to continue. \
          Hopefully I can publish my first version of the site soon, let's see how that goes."},
        
        {date: "17/08",
        title: "API progress",
        desc: "I have created a database schema and made enough progress with the backend to create/add or delete new users. \
          So far it's not very secure, I decided to store users in my own database instead of implementing 0Auth. \
          In the future I want to add some kind of authentication token for more security"},
        
          {date: "15/08",
        title: "The beginning",
        desc: "This started as just a small site for me to keep pictures of my dog. \
          The front-end was stated a few days ago as a fun thing. \
          But now I have decided to make a full project of it and add more sections. \
          My first addition will be an API and a server to store my pop collection, UI for adding them comes later."},
      ]
    },
  ]


  return (<div className="devlog-container">
    {fullLog.map(year => 
      <article className="year-container" key={year.year}> 
        <section>
          <h4>{year.year}</h4>
        </section>

        <section className="logs-container">
          {year.logs.map(log => 
            <div className="logs" key={log.date}>
              <div className='title-container'><h4>{log.date}</h4> <h4>{log.title}</h4></div>
              <div className='horisontal-divider'/>
              <p>{log.desc}</p>
            </div>
          )}
        </section>

      </article>
    )}

    <About /> 

  </div>);
}

export default DevLog;