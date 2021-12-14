using System;
using System.IO;
using System.Collections.Generic;
using System.Text;


namespace lessonsMaker
{
    class VocabularyHelper
    {
        private string dirPath;
        private string fileName;
        private string encoding;
        public VocabularyHelper(string dirPath, string fileName, string encoding = "windows-1251")
        {
            this.dirPath = dirPath + "\\";
            this.fileName = fileName;
            this.encoding = encoding;
        }
        public void SortByChars(string targetFileName, string outputDirPath, int minLength)
        {
            string targetDir = this.dirPath + "\\"+outputDirPath;
            string targetFilePath = this.dirPath + "\\" + targetFileName;
            List<string> _chars = new List<string>();
            List<StreamWriter> _files = new List<StreamWriter>();

            CreateDir(targetDir);
            //DirectoryInfo dirInfo = new DirectoryInfo(targetDir);
            //if (!dirInfo.Exists) dirInfo.Create();

            targetDir += "\\";

            string curr_dir = targetDir;
            using (StreamReader sr = new StreamReader(targetFilePath))
            {

                string line;
                while ((line = sr.ReadLine()) != null)
                {
                    if (line.Split(' ').Length == 2)
                    {
                        //создаём имя папки - первый аргумент в строке
                        curr_dir = targetDir + line.Split(' ')[1];
                        CreateDir(curr_dir);
                        curr_dir += "\\";
                        //Создаём файл информации о каталоге - нулевой аргумент в строке
                        CreateFileWrite(curr_dir + "$dirInfo.txt", line.Split(' ')[0].Replace('_', ' '));
                        continue;
                        //_dirs.Add(new DirectoryInfo(targetDir + line));
                    }
                    _chars.Add(line.Split(' ')[0]);
                    StreamWriter file = new StreamWriter(
                        curr_dir +
                        (line.Split(' ')[2] != null && line.Split(' ')[2].Length >= 1 ? line.Split(' ')[2] : line.Split(' ')[1]) +
                        ".txt"
                        , false);
                    file.WriteLine("$" + line.Split(' ')[1].Replace('_',' '));
                    _files.Add(file);
                }

            }
            /*foreach (var str in _chars)
            {
            }*/

            using (StreamReader sr = new StreamReader(this.dirPath + this.fileName, Encoding.GetEncoding(this.encoding)))
            {
                string line;
                while ((line = sr.ReadLine()) != null)
                {
                    if (line.Length < minLength) continue;

                    for (int i = 0; i < _chars.Count; i++)
                    {
                        if (CheckContains(line, _chars[i])) _files[i].WriteLine(line);

                    }
                }
                foreach (var file in _files) file.Close();

            }
        }
        private bool CheckContains(string line, string _chars)
        {
            bool isOk;
            foreach (char letter in line)
            {
                isOk = false;
                foreach (char ch in _chars)
                {
                    if (letter == ch)
                    {
                        isOk = true;
                        break;
                    }
                }
                if (!isOk) return false;

            }
            return true;
        }
        private void CreateDir(string dirPath)
        {
            DirectoryInfo dirInfo = new DirectoryInfo(dirPath);
            if (!dirInfo.Exists) dirInfo.Create();
        }
        private void CreateFileWrite(string path, string text)
        {
            using (StreamWriter sw = new StreamWriter(path))
            {
                sw.WriteLine(text);
            }
        }
    }
    class Program
    {
        static void Main(string[] args)
        {
            System.Console.OutputEncoding = System.Text.Encoding.UTF8;
            //string path = Environment.CurrentDirectory + "../../../Data/";
            string path = Environment.CurrentDirectory;
            string sourceFilePath = "";
            string inputFilePath = "";
            string outputDirPath = "";
            int minWordLength = 0;

            using (StreamReader sr = new StreamReader(path + "\\config.txt"))
            {
                sourceFilePath = sr.ReadLine();
                inputFilePath = sr.ReadLine();
                outputDirPath = sr.ReadLine();
                minWordLength = int.Parse(sr.ReadLine());
            }

            GetVocabularyProgram(path);
            Console.WriteLine("Done!!!");
            Console.ReadLine();

            void GetVocabularyProgram(string dir_path)
            {
                VocabularyHelper vh = new VocabularyHelper(path, sourceFilePath);
                List<string> _chars = new List<string>() { };
                vh.SortByChars(inputFilePath, outputDirPath, minWordLength);
            }
        }
    }
}
