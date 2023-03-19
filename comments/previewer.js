class CommentPreviewer{
  constructor(path, comment){
    if(document.getElementById('dtf-commentsPreviewer')) return;
    this.main=new Div({
      path: path,
      cName: 'dtf-window commentsPreviewer',
      id: 'dtf-commentsPreviewer',
      rtn: [],
      onclick: () => {
        this.main.remove();
      }
    });

    this.header=new Div({
      path: this.main,
      cName: 'header',
      rtn: []
    });
    this.label=new Div({
      path: this.header,
      cName: 'label',
      text: 'COMMENT PREVIEWER',
    });

    this.preview=new Div({
      path: this.main,
      cName: 'preview',
      rtn: []
    });

    this.previewText=new Div({
      path: this.preview,
      text: comment
    });
    this.text=new Div({
      path: this.preview,
      cName: 'commentText',
      text: '',
      rtn: []
    });
    attachmentsChecker(this.preview.textContent.trim(), this.preview);
  }
};
