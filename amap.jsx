import React, { Component } from 'react';
import { Map, Markers } from 'react-amap';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import yellow from '@material-ui/core/colors/yellow';
import red from '@material-ui/core/colors/red';
import purple from '@material-ui/core/colors/purple';
import Checkbox from '@material-ui/core/Checkbox';
import U181 from '../../image/green.png';
import U183 from '../../image/yellow.png';
import U185 from '../../image/blue.png';
import U187 from '../../image/purple.png';
import U189 from '../../image/red.png';
import axios from 'axios';
import history from '../../history';

const h = document.documentElement.clientHeight || document.body.clientHeight;
const styles = {
    feng: {
      color: green[600],
      '&$checked': {
        color: green[500],
      },
    },
    huo: {
        color: red[600],
        '&$checked': {
          color: red[500],
        },
      },
    shui: {
      color: blue[600],
      '&$checked': {
        color: blue[500],
      },
    },
    guang: {
        color: yellow[600],
        '&$checked': {
          color: yellow[500],
        },
      },
    he: {
      color: purple[600],
      '&$checked': {
        color: purple[500],
      },
    },
    checked: {},
  };
const stylegreen = {
  padding: '12px',
  backgroundImage: `url(${U181})`,
  backgroundSize: '100%',
};

const mouseovergreenStyle = {
  padding: '15px',
  backgroundImage: `url(${U181})`,
  backgroundSize: '100%',
};
const styleyellow = {
  padding: '12px',
  backgroundImage: `url(${U183})`,
  backgroundSize: '100%',
};

const mouseoveryellowStyle = {
  padding: '15px',
  backgroundImage: `url(${U183})`,
  backgroundSize: '100%',
};
const styleblue = {
    padding: '12px',
    backgroundImage: `url(${U185})`,
    backgroundSize: '100%',
  };
const mouseoverblueStyle = {
   padding: '15px',
   backgroundImage: `url(${U185})`,
   backgroundSize: '100%',
}  
const stylepurple = {
    padding: '12px',
    backgroundImage: `url(${U187})`,
    backgroundSize: '100%',
  };
  const mouseoverpurpleStyle = {
    padding: '15px',
    backgroundImage: `url(${U187})`,
    backgroundSize: '100%',
  };
  const stylered = {
      padding: '12px',
      backgroundImage: `url(${U189})`,
      backgroundSize: '100%',
    };
  const mouseoverredStyle = {
     padding: '15px',
     backgroundImage: `url(${U189})`,
     backgroundSize: '100%',
  }  
class App extends Component {
    state = {
        markers: [],
        data: [],
        mapCenter: {longitude: 110, latitude: 38},
        huo: true,
        guang: true,
        feng: true,
        shui: true,
        he: true,
        markerEvents: {
            mouseover:(e, marker) => {
              marker.render(this.renderMouseoverLayout);
            },
            mouseout: (e, marker) => {
              marker.render(this.renderMarkerLayout);
            }
          }
        }
      componentWillMount() {
        axios.post('http://localhost:8080/index/getIndex/')
        .then((response) => {
          let d = response.data;
          let tempdata = [];
          for(let i = 0; i < d.length; i++) {
            let ttdata = {};
            ttdata.plantName = d[i].plantName;
            ttdata.powerType = d[i].powerType;
            let tt = {};
            tt.longitude = d[i].coordinate.split(',')[0];
            tt.latitude = d[i].coordinate.split(',')[1];
            ttdata.position = tt;
            tempdata.push(ttdata);
          } 
          this.setState({data: tempdata, markers: tempdata});
        })
        .catch(function (error) {
          console.log(error);
        });
      }
      renderMouseoverLayout = (extData) => {
        if (extData.powerType === '风电'){
          return <Tooltip id="tooltip-top" title={extData.plantName} placement="top"><div style={mouseovergreenStyle} onClick={() => history.push('/fac/123456')}>{extData.myLabel}</div></Tooltip>;
        }
        if (extData.powerType === '水电'){
            return <Tooltip id="tooltip-top" title={extData.plantName} placement="top"><div style={mouseoverblueStyle}>{extData.myLabel}</div></Tooltip>;
        }
        if (extData.powerType === '核电'){
            return <Tooltip id="tooltip-top" title={extData.plantName} placement="top"><div style={mouseoverpurpleStyle}>{extData.myLabel}</div></Tooltip>;
        }
        if (extData.powerType === '火电'){
            return <Tooltip id="tooltip-top" title={extData.plantName} placement="top"><div style={mouseoverredStyle}>{extData.myLabel}</div></Tooltip>;
          }
        return <Tooltip id="tooltip-top" title={extData.plantName} placement="top"><div style={mouseoveryellowStyle}>{extData.myLabel}</div></Tooltip>
      }
      
      renderMarkerLayout = (extData) => {
        if (extData.powerType === '风电'){
           return <div style={stylegreen}>{extData.myLabel}</div>;
        }
        if (extData.powerType === '水电'){
            return <div style={styleblue}>{extData.myLabel}</div>;
        }
        if (extData.powerType === '核电'){
            return <div style={stylepurple}>{extData.myLabel}</div>;
        }
        if (extData.powerType === '火电'){
            return <div style={stylered} >{extData.myLabel}</div>;
        }
        return <div style={styleyellow}>{extData.myLabel}</div>;
      }
      handleChange = name => event => {
        this.setState({ [name]: event.target.checked});
        setTimeout(this.f, 100);
      };
      f = () => {
        let tempdata = this.state.data;
        if(!this.state.guang) {
            tempdata = tempdata.filter(t => t.powerType !== '太阳能发电');
        }
        if(!this.state.shui) {
            tempdata = tempdata.filter(t => t.powerType !== '水电');
        }
        if(!this.state.he) {
            tempdata = tempdata.filter(t => t.powerType !== '核电');
        }
        if(!this.state.huo) {
            tempdata = tempdata.filter(t => t.powerType !== '火电');
        }
        if(!this.state.feng) {
            tempdata = tempdata.filter(t => t.powerType !== '风电');
        }
        this.setState({markers: tempdata});
      }
      render(){   
        const { classes } = this.props;
        return <div>
          <div style={{width: '100%', height: h - 66 + 'px'}}>
            {/* <div style={{position: 'fixed', width: '181px', height: '250px', top: '126px', zIndex: 10, left: '50px'}}>
                <div style={{background: `url(${feng})`, backgroundSize: '100%', height: '41px', cursor: 'pointer'}}></div>
                <div style={{background: `url(${guang})`, backgroundSize: '100%', height: '41px', marginTop: '10px', cursor: 'pointer'}}></div>
                <div style={{background: `url(${he})`, backgroundSize: '100%', height: '41px', marginTop: '10px', cursor: 'pointer'}}></div>
                <div style={{background: `url(${huo})`, backgroundSize: '100%', height: '41px', marginTop: '10px', cursor: 'pointer'}}></div>
                <div style={{background: `url(${shui})`, backgroundSize: '100%', height: '41px', marginTop: '10px', cursor: 'pointer'}}></div>
            </div> */}
            <FormControl component="fieldset" style={{position: 'fixed', top: '126px', zIndex: 10, left: '50px'}}>
                <FormLabel component="legend">发电类型</FormLabel>
                <FormGroup>
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={this.state.huo}
                        onChange={this.handleChange('huo')}
                        value="huo"
                        classes={{
                            root: classes.red,
                            checked: classes.checked,
                          }}
                    />
                    }
                    label="火电"
                />
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={this.state.guang}
                        onChange={this.handleChange('guang')}
                        value="guang"
                        classes={{
                            root: classes.guang,
                            checked: classes.checked,
                          }}
                    />
                    }
                    label="太阳能发电"
                />
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={this.state.feng}
                        onChange={this.handleChange('feng')}
                        value="feng"
                        classes={{
                            root: classes.feng,
                            checked: classes.checked,
                          }}
                    />
                    }
                    label="风电"
                />
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={this.state.shui}
                        onChange={this.handleChange('shui')}
                        value="shui"
                        classes={{
                            root: classes.shui,
                            checked: classes.checked,
                          }}
                    />
                    }
                    label="水电"
                />
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={this.state.he}
                        onChange={this.handleChange('he')}
                        value="he"
                        classes={{
                            root: classes.he,
                            checked: classes.checked,
                          }}
                    />
                    }
                    label="核电"
                />
                </FormGroup>
            </FormControl>
            <Map plugins={['ToolBar']} center={this.state.mapCenter} zoom={4.5}>
              <Markers 
                events={this.state.markerEvents}
                markers={this.state.markers}
                render={this.renderMarkerLayout}
              />
            </Map>
          </div>
        </div>
      }
}

export default withStyles(styles)(App);
