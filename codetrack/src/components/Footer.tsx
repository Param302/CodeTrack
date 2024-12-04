export default function Footer() {
    return (
      <footer className="fixed bottom-0 flex justify-center items-center w-screen px-6 py-4  border-t border-border-light dark:border-border-dark transition-colors duration-200 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
        <p className="text-sm text-content-light dark:text-content-dark">
          Made with 💙 by{" "}
          <a 
            href="https://github.com/param302" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline transition-all"
          >
            Parampreet Singh
          </a>
        </p>
      </footer>
    );
  }