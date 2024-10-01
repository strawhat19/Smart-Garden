import dynamic from 'next/dynamic';

// Helper Functions
export const scrollTop = () => {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

export const scrollBottom = () => {
  window.scrollTo(0,document.body.scrollHeight); // For Safari
  window.scrollTo(0,document.documentElement.scrollHeight); // For Chrome, Firefox, IE and Opera
}

 export const helperFunctions = {

   // Get Current Page State
   getCurrentPageName: () => {
       return window.location.hash.slice(window.location.hash.lastIndexOf(`/`)).replace(`/`, ``) as string;
   },

  // Cut Off Long Strings of Text & Replace with Custom Character... Also known as Truncation
  cutOffTextAndReplace: (string: string, end: number, replacement: string) => {
      if (!replacement) {
          replacement = `...` || `-`;
      }
      return string?.length > end ? string?.substring(0, end - 1) + replacement : string;
  },

  // Capitalize First Letter of Every Word in String
  capitalizeAllWords: (string: string) => {
      let words: any = string.split(` `);
      let capWords = words.map((word:any) => {
          let capitalizedWord = word?.charAt(0)?.toUpperCase() + word?.slice(1);
          return capitalizedWord || word;
      })
      return capWords.join(` `);
  },
  
  // Remove Duplicate Objects from Array
  removeDuplicateObjectFromArray: (arrayOfObjects?: any) => {
      const uniqueArray = arrayOfObjects?.filter((value?: any, index?: any) => {
          const _value = JSON.stringify(value);
          return index === arrayOfObjects?.findIndex((obj?: any) => {
              return JSON.stringify(obj) === _value;
          });
      });
      return uniqueArray;
  },

}

export const LazyLoadImage = dynamic(async () => {
    const mod = await import('react-lazy-load-image-component');
    return mod.LazyLoadImage;
  }, {ssr: false}
);
export const IonHeader = dynamic(async () => {
      const mod = await import('@ionic/react');
      return mod.IonHeader;
    }, { ssr: false }
  );
export const IonToolbar = dynamic(async () => {
      const mod = await import('@ionic/react');
      return mod.IonToolbar;
    }, { ssr: false }
  );
export const IonSegment = dynamic(async () => {
      const mod = await import('@ionic/react');
      return mod.IonSegment;
    }, { ssr: false }
  );
export const IonSegmentButton = dynamic(async () => {
      const mod = await import('@ionic/react');
      return mod.IonSegmentButton;
    }, { ssr: false }
  );
export const IonGrid = dynamic(async () => {
      const mod = await import('@ionic/react');
      return mod.IonGrid;
    }, { ssr: false }
  );
export const IonRow = dynamic(async () => {
      const mod = await import('@ionic/react');
      return mod.IonRow;
    }, { ssr: false }
  );
export const IonCol = dynamic(async () => {
      const mod = await import('@ionic/react');
      return mod.IonCol;
    }, { ssr: false }
  );
export const IonButton = dynamic(async () => {
      const mod = await import('@ionic/react');
      return mod.IonButton;
    }, { ssr: false }
  );
export const IonTitle = dynamic(async () => {
      const mod = await import('@ionic/react');
      return mod.IonTitle;
    }, { ssr: false }
  );
export const IonLabel = dynamic(async () => {
      const mod = await import('@ionic/react');
      return mod.IonLabel;
    }, { ssr: false }
  );
export const IonInput = dynamic(async () => {
      const mod = await import('@ionic/react');
      return mod.IonInput;
    }, { ssr: false }
  );
export const IonItem = dynamic(async () => {
      const mod = await import('@ionic/react');
      return mod.IonItem;
    }, { ssr: false }
  );