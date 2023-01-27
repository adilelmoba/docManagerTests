class DocumentManager {
  documents: { id: number; name: string }[] = [];

  list(): Array<any> {
    return this.documents;
  }

  addDoc(doc): Array<any> {
    if (doc.name){ 
      this.documents.push({id: this.documents.length === 0 ? 1 : this.documents[this.documents.length - 1].id + 1, name: doc.name});
      return this.documents
    } else throw Error("There is no name!")
  }

  updateDoc(docParam){
    const findDoc = this.documents.findIndex((doc) => docParam.id === doc.id); 
    if(findDoc === 1) {
      this.documents[findDoc].name = docParam.name;
    } else throw Error("This document does not exist!")
  }

  deleteDoc(docParam): Array<any> {
    const findDoc = this.documents.find((doc) => docParam.id === doc.id); 
    if (findDoc){ 
      return this.documents = this.documents.filter((doc) => docParam.id !== doc.id);
    } else throw Error("This document does not exist!")
  }

  duplicateDoc(docId): Array<any> {
    let toBeDuplicated = this.documents.find((doc) => docId === doc.id);
    if (toBeDuplicated) {
      let newDoc = {
        id: this.documents[this.documents.length - 1].id + 1,
        name: toBeDuplicated.name
      }
      this.documents.push(newDoc);
      
      return this.documents;
    } else throw Error("This document does not exist!")
  }

  deleteDocs() {
    this.documents = []
  }

  sortDocs(sortBy) {
    return this.documents.sort((a, b) =>{
      if(sortBy === "asc") 
        return a.id - b.id
      else
        return b.id - a.id
    })
  }

  numberOfDocs(): Number {
    return this.documents.length;
  }
}

describe("Document Manager", () => {
  let documentManager;
  beforeEach(function(){
    documentManager = new DocumentManager();
  })
  it("Should list nothing if there is no documents", () => {
    expect(documentManager.list()).toEqual([]);
  });
  it("Should add a document", () => {
    expect(
      documentManager.addDoc({ name: 'My first doc' })
    ).toEqual([
      { id: 1, name: 'My first doc' },
    ]);
  });
  it("Should return Error if the name is not set", () => {
    expect(() => {documentManager.addDoc( {} )}).toThrow("There is no name!");
  });

  describe("Document Manager functionality", () => {
    beforeEach(function(){
    documentManager.addDoc({ name: "My first doc" });
    documentManager.addDoc({ name: "My second doc" });
    });
    it("Should add a document", () => {
      expect(
        documentManager.addDoc({ name: "My first doc" })
      ).toEqual([
        { id: 1, name: "My first doc" },
        { id: 2, name: "My second doc" },
        { id: 3, name: "My first doc" },
      ]);
    });
    it("Should list all documents if there is documents", () => {
      expect(documentManager.list()).toEqual([
        { id: 1, name: "My first doc" },
        { id: 2, name: "My second doc" },
      ]);
    });
    it("Should list all documents sort by id mode ASC", () => {
      expect(documentManager.sortDocs("asc")).toEqual([
        { id: 1, name: "My first doc" },
        { id: 2, name: "My second doc" },
      ]);
    });
    it("Should list all documents sort by id mode DESC", () => {
      expect(documentManager.sortDocs("desc")).toEqual([
        { id: 2, name: "My second doc" },
        { id: 1, name: "My first doc" },
      ]);
    });
    it("Should delete one document", () => {
      documentManager.deleteDoc({ id: 1 });
      expect(documentManager.list()).toEqual([
        { id: 2, name: "My second doc" },
      ]);
    });
    it("Should return Error if the id not existe to delete document", () => {
      expect(() => {documentManager.deleteDoc({ id: 99999 })}).toThrow("This document does not exist!");
  });
    it("Should update one document if the ID is valid", () => {
      documentManager.updateDoc( {id: 2, name: "New name"} );
      expect(documentManager.list()).toEqual([
        { id: 1, name: "My first doc" },
        { id: 2, name: "New name" },
      ]);
    });
    it("Should return Error if the id not existe to update document", () => {
      expect(() => {documentManager.updateDoc( {id: 6546548, name: "New name"} )}).toThrow("This document does not exist!");
    });
    it("Should see the number of documents", () => {
      expect(documentManager.numberOfDocs()).toEqual(2);
    });
    it("Should duplicate a document", () => {
      expect(documentManager.duplicateDoc(2)).toEqual([
        { id: 1, name: "My first doc" },
        { id: 2, name: "My second doc" },
        { id: 3, name: "My second doc" },
      ]);
    });
    it("Should return Error if the id not existe to duplicate document", () => {
      expect(() => {documentManager.duplicateDoc(845615615)}).toThrow("This document does not exist!");
    });
    it("Should delete all documents", () => {
      documentManager.deleteDocs();
      expect(documentManager.list()).toEqual([]);
    });
  });
});