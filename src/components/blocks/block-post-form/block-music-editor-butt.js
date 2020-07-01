import React, { Component } from 'react';

import musicIcon from 'assets/img/music.svg';

class MusicToolbarButton extends Component {
    insertAudio = () => {
        const { editorState, onChange } = this.props;

        let url;
        var file = document.querySelector("#music__file").files[0];
        var reader = new FileReader();
        reader.addEventListener('load', function(evt) {
            url = evt.target.result;

            const contentState = editorState.getCurrentContent();
            const contentStateWithEntity = contentState.createEntity(
                'audio',
                'MUTABLE',
                {src: url}
            );

            const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        
            const newEditorState = EditorState.set(
                editorState,
                {currentContent: contentStateWithEntity}
            );
    
            onChange(AtomicBlockUtils.insertAtomicBlock(
                newEditorState,
                entityKey,
                ' '
            ));

        }, false);
        reader.readAsDataURL(file);
      };
  
    render() {
      return (
        <>
            <label htmlFor='music__file'>
                <div className="rdw-option-wrapper rdw-music-custom-option">
                    <img src={musicIcon} />
                </div>
            </label>
            <input type="file" className='file-input' id='music__file' onChange={this.insertAudio}/>
        </>
      );
    }
}

export { MusicToolbarButton };