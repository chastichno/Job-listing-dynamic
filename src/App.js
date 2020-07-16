import React from 'react';
import './styles/style.css';
import removeIcon from './images/icon-remove.svg';
import dataJson from './data.json';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tagsToggle: false,
      tags: []
    }
    this.toggleSearch = this.toggleSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.addTag = this.addTag.bind(this);
    this.removeTag = this.removeTag.bind(this);
  }

  toggleSearch() {
    this.setState(state => ({
      tagsToggle: !state.tagsToggle
    }))
  }

  clearSearch() {
    this.toggleSearch();
    this.setState({
      tags: []
    })
  }

  addTag(event) {
    if (this.state.tags.length === 0) {
      this.toggleSearch();
    }
    const tag = event.target.dataset.text;
    console.log("Add tag: ", tag);
    if (!this.state.tags.includes(tag)) {
      var joined = this.state.tags.concat(tag);
      this.setState({ tags: joined })
    }

  }

  removeTag(event) {
    if (this.state.tags.length === 1) {
      this.toggleSearch();
    }
    const tag = event.target.dataset.text;
    let removed = [...this.state.tags]
    let index = this.state.tags.indexOf(tag);
    removed.splice(index, 1);
    this.setState({ tags: removed })
  }



  render() {
    const dataJsonClean = this.state.tagsToggle ? dataJson.filter((item) => {
      const tagsItem = [item.role, item.level, ...item.languages, ...item.tools];
      //AND FILTERING
      return this.state.tags.every(tag => tagsItem.includes(tag))
      //OR FILTERING:
      // return tagsItem.some(tag => this.state.tags.includes(tag))
    }) : dataJson;
    console.log(dataJsonClean);

    return (
      <div className="App" >
        <header>
          <div className="header"></div>
        </header>
        <div className={this.state.tagsToggle ? "search" : "search none"} id="search">
          <div className="search__container">
            <div className="search__items">
              {this.state.tags.map(tag => {
                return (
                  <div className="search__item">
                    <div className="search__item-text">{tag}</div>
                    <div onClick={this.removeTag} className="search__close" data-text={tag}><img src={removeIcon} alt="delete" /></div>
                  </div>
                )
              })}

            </div>

            <div className="search__clear" onClick={this.clearSearch}>Clear</div>
          </div>
        </div>
        <section className="list">

          {dataJsonClean.map((item) => {
            const tags = [item.role, item.level, ...item.languages, ...item.tools];
            return (
              <div className={item.featured ? "list__item list__item-border" : "list__item"} key={item.id}>
                <div className="list__image" style={{ backgroundImage: `url(${require("./images/" + item.logo)}` }}>
                  {/* <img src={require('./images/' + item.logo)} alt="" /> */}
                </div>
                <div className="list__text">
                  <div className="list__description">
                    <div className="list__header">
                      <span className="company">{item.company}</span>
                      {item.new ? <span className="label new">New!</span> : null}
                      {item.featured ? <span className="label featured">Featured</span> : null}

                    </div>
                    <div className="list__title">{item.position}</div>
                    <div className="list__footer">
                      <span className="list__li">{item.postedAt}</span>
                      <span className="list__dot">•</span>
                      <span className="list__li">{item.contract}</span>
                      <span className="list__dot">•</span>
                      <span className="list__li">{item.location}</span>
                    </div>
                  </div>
                  <hr className="solid" />
                  <div className="list__tags">
                    {tags.map((tag) => {
                      return (
                        <a href="#" onClick={this.addTag} className="list__tag" data-text={tag} key={tag}>{tag}</a>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })}

        </section>
      </div>
    )
  };
}

export default App;
