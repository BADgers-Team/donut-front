import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import Loader from 'react-loader-spinner';
import AjaxModule from 'services/ajax';
import RouterStore from 'store/routes';

class Content extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            isLoaded: false, 
            data: null, 
        };
    }

    componentDidMount() {
        const { editor } = this.props;

        debugger

        const { contentState } = editor;
        const entityKey = editor.block.getEntityAt(0);

        const entity = contentState.getEntity(
            entityKey
        );
        const {src} = entity.getData();

        this.setState({isLoaded: false}, () => { const p = FileHandler.loadFile(src);
            if (!p) return;
            p.then((response) => {
                if (response.data?.status) {
                    throw new Error(response.data?.message);
                };

                const data = response.data;  
                debugger                
                contentState.replaceEntityData(entityKey, { src: data.link });
                //contentState.replaceEntityData(entityKey, { id: data.id });
                
                this.setState({data: data, isLoaded: true});
          })});
    }

    render () { 
        const { type } = this.props; 
        const { isLoaded, data } = this.state;       

        return (
            
            <>
                { isLoaded ? type === 'audio' ? 
            <Audio src={data?.link} id={data?.id}/> : <Image src={data?.link} id={data?.id}/> 
                : <Loader
                    type="Oval"
                    color="#FF6982"
                    height={120}
                    width={120}/>
                }
            </>
        )   
    }
}



function dataURLtoFile(dataurl, filename) {
    if (!dataurl) return;
    var arr = dataurl.split(',');
    if (!arr || !arr[0].match(/:(.*?);/)) return;
    var mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
}

class FileHandler {
    static loadFile(fileData) {  
        const reqBody = dataURLtoFile(fileData);
        if (!reqBody) return;
        // this.setState({isDisabled: Input.startLoader()}, this.checkDisabledButtonStyle);
        const data = new FormData();
        data.append('image', reqBody, reqBody.name);
        return AjaxModule.doAxioPost(RouterStore.api.posts.file.new, data, 'multipart/form-data')
            // .then((response) => {
            //     if (response.data?.status) {
            //         throw new Error(response.data?.message);
            //     }  

            //     file.update(response.data);
            //     debugger   
            //     callback();

                // this.setState((prevState => ({
                //     fileIDs: [...prevState.fileIDs, response.data]
                // })));
                // this.setState({isDisabled: Input.finishLoader(true)}, this.checkDisabledButtonStyle);
            // })
            // .catch((error) => {
            //     console.log(error);
                // this.setState({
                //     isDisabled: Input.finishLoader(),
                //     errors: {
                //         file: error.message,
                //     }
                // }, this.checkDisabledButtonStyle);
            // });
    }
}



@inject('post')
@observer
class Audio extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            fileID: 0, 
            src: '', 
        };
    }

    componentDidMount() {
        //this.loadFile(this.props.src);
    }

    componentWillUnmount() {
        const { post } = this.props; 
        const { fileID } = this.state; 

        post.file_ids.remove(fileID);
    }

    render () {    
        return (
            <div className='rdw-audio-audiowrapper' className='music__control'>
                <audio src={this.props.src} id={this.props.id} className='audio-player' controls/>
            </div>
        )   
    }
}


@inject('post')
@observer
class Embedded extends Component {
    constructor(props) {
        super(props);
    }

    checkLink = link => {
        let embeddeLink = link;
        
        if (embeddeLink.match('https://vimeo.com/')) {
            let videoID = embeddeLink.split('https://vimeo.com/');
            videoID = videoID[1].split('#')[0];
            return 'https://player.vimeo.com/video/' + videoID;
        }

        if (embeddeLink.indexOf("youtube") >= 0 || embeddeLink.indexOf("youtu.be") >= 0){
            embeddeLink = embeddeLink.replace("watch?v=","embed/");
            embeddeLink = embeddeLink.replace("/watch/", "/embed/");
            embeddeLink = embeddeLink.replace("youtu.be/","youtube.com/embed/");
            embeddeLink = embeddeLink.replace("&feature=youtu.be","");
        }

        return embeddeLink;
    }

    render () {    
        const { block, contentState } = this.props;
        const entity = contentState.getEntity(block.getEntityAt(0));
        const { src, height, width } = entity.getData();

        const embeddeSrc = this.checkLink(src);
            
        return (
            <iframe height={height} width={width} src={embeddeSrc} frameBorder="0" allowFullScreen title="Embedded Content" />
        )   
    }
}


@inject('post')
@observer
class Image extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            fileID: 0,
            src: '', 
        };
    }

    componentDidMount() {
        // let filesIDS = post.file_ids === null ? [] : post.file_ids;
        // filesIDS.push(response.data.id);

        // const obj = {
        //     file_ids: filesIDS,
        // };
        // post.update(obj);
        // this.setState({ fileID: response.data.id, src: response.data.link });
    }

    componentWillUnmount() {
        const { post } = this.props; 
        const { fileID } = this.state; 

        post.file_ids.remove(fileID);
    }

    render () {          
        return (
            <div className='rdw-image-imagewrapper'>
                <img src={this.props.src} id={this.props.id} />
            </div>
        )   
    }  
}

export { Audio, Embedded, Image, Content};