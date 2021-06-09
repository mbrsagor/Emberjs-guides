class Family {

    public void singleFamily(){
        System.out.println("We are single family");
    }

    public void doubleFamily(){
        System.out.println("We are double family");
    }

    public void happyFamily(){
        System.out.println("We are happy family");
    }
}

public class Sagor extends Family{

    public static void main(String args[]){  
        Family f = new Family();
        f.singleFamily();
        f.doubleFamily();
        f.happyFamily();
    }  
}
